"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Bell, Calendar, CheckCircle, Clock, UserPlus } from "lucide-react";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "appointment" | "schedule" | "system" | "user";
    timestamp: Date;
    read: boolean;
}

// No real-time notifications backend exists yet — keep this list empty rather than
// showing fabricated activity. Wire this up to a real notifications endpoint when one exists.
const NOTIFICATIONS: Notification[] = []

const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "appointment":
            return <Calendar className="h-4 w-4 text-blue-600" />
        case "schedule":
            return <Clock className="h-4 w-4 text-amber-600" />
        case "system":
            return <CheckCircle className="h-4 w-4 text-purple-600" />
        case "user":
            return <UserPlus className="h-4 w-4 text-green-600" />
        default:
            return <Bell className="h-4 w-4 text-gray-600" />
    }
}

const NotificationDropdown = () => {

    const unreadCount = NOTIFICATIONS.filter(notification => !notification.read).length;
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
                <span>
                    Notifications
                </span>
                {
                    unreadCount > 0 && (
                        <Badge variant={"secondary"} className="ml-2">
                            {unreadCount} new
                        </Badge>
                    )
                }
            </DropdownMenuLabel>

            <DropdownMenuSeparator/>

            <ScrollArea className="h-75">
                {
                    NOTIFICATIONS.length > 0 ? (
                        NOTIFICATIONS.map(notification => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-2 p-3 cursor-pointer">
                                <div className="mt-0.5">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none">
                                            {notification.title}
                                        </p>
                                        {
                                            !notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-blue-600"/>
                                            )
                                        }
                                    </div>

                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {notification.message}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(notification.timestamp, {
                                            addSuffix: true
                                        })}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            No notifications yet
                        </div>
                    )
                }
            </ScrollArea>
        </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default NotificationDropdown
