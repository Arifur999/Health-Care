"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMyNotifications, markAllNotificationsRead, markNotificationRead } from "@/services/notification.services";
import { type INotification, type NotificationType } from "@/types/notification.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Bell, Calendar, CheckCircle, CreditCard, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
        case "APPOINTMENT":
            return <Calendar className="h-4 w-4 text-blue-600" />
        case "PRESCRIPTION":
            return <FileText className="h-4 w-4 text-emerald-600" />
        case "PAYMENT":
            return <CreditCard className="h-4 w-4 text-amber-600" />
        default:
            return <CheckCircle className="h-4 w-4 text-purple-600" />
    }
}

const formatWhen = (value: string) => {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? "" : formatDistanceToNow(date, { addSuffix: true })
}

const NotificationDropdown = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { data: response } = useQuery({
        queryKey: ["my-notifications"],
        queryFn: getMyNotifications,
        refetchInterval: 60 * 1000, // poll every minute for new notifications
        refetchOnWindowFocus: true,
    })

    const notifications: INotification[] = response?.data ?? []
    const unreadCount = notifications.filter((n) => !n.isRead).length

    const markReadMutation = useMutation({
        mutationFn: markNotificationRead,
        onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["my-notifications"] }),
    })

    const markAllMutation = useMutation({
        mutationFn: markAllNotificationsRead,
        onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["my-notifications"] }),
    })

    const handleClick = (notification: INotification) => {
        if (!notification.isRead) {
            markReadMutation.mutate(notification.id)
        }
        if (notification.link) {
            router.push(notification.link)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant={"destructive"}>
                            <span className="text-[10px]">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align={"end"} className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            onClick={() => markAllMutation.mutate()}
                            disabled={markAllMutation.isPending}
                            className="cursor-pointer text-xs font-medium text-primary hover:underline"
                        >
                            Mark all read
                        </button>
                    )}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <ScrollArea className="h-75">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <button
                                type="button"
                                key={notification.id}
                                onClick={() => handleClick(notification)}
                                className={`flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-muted ${
                                    notification.isRead ? "" : "bg-accent/5"
                                }`}
                            >
                                <div className="mt-0.5 shrink-0">{getNotificationIcon(notification.type)}</div>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="truncate text-sm font-medium leading-none">{notification.title}</p>
                                        {!notification.isRead && <span className="size-2 shrink-0 rounded-full bg-blue-600" />}
                                    </div>
                                    <p className="line-clamp-2 text-xs text-muted-foreground">{notification.message}</p>
                                    <p className="text-xs text-muted-foreground">{formatWhen(notification.createdAt)}</p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="p-6 text-center text-sm text-muted-foreground">No notifications yet</div>
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationDropdown
