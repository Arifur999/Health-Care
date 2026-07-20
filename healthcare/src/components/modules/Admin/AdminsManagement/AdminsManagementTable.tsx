"use client";

import { changeAdminRoleAction, changeAdminStatusAction } from "@/app/(dashboardLayout)/admin/dashboard/admins-management/_action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllAdmins } from "@/services/admin.services";
import { type IAdminListItem } from "@/types/admin.types";
import { type UserRole } from "@/lib/authUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, ShieldCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeleteAdminConfirmationDialog from "./DeleteAdminConfirmationDialog";

const getInitials = (name?: string) => {
  if (!name) return "A";
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

interface AdminsManagementTableProps {
  currentUserRole: UserRole;
  currentUserId?: string;
}

const AdminsManagementTable = ({ currentUserRole, currentUserId }: AdminsManagementTableProps) => {
  const queryClient = useQueryClient();
  const [deletingAdmin, setDeletingAdmin] = useState<IAdminListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: adminsResponse, isLoading } = useQuery({
    queryKey: ["admin-admins"],
    queryFn: getAllAdmins,
  });

  const admins: IAdminListItem[] = adminsResponse?.data ?? [];
  const canManage = currentUserRole === "SUPER_ADMIN";

  const statusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: "ACTIVE" | "BLOCKED" }) =>
      changeAdminStatusAction(userId, status),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || "Failed to change status");
        return;
      }
      toast.success("Status updated");
      void queryClient.invalidateQueries({ queryKey: ["admin-admins"] });
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: "ADMIN" | "SUPER_ADMIN" }) =>
      changeAdminRoleAction(userId, role),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || "Failed to change role");
        return;
      }
      toast.success("Role updated");
      void queryClient.invalidateQueries({ queryKey: ["admin-admins"] });
    },
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading admins...</p>;
  }

  if (admins.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No admins found.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => {
          const status = admin.user?.status ?? "ACTIVE";
          const role = admin.user?.role ?? "ADMIN";
          const isSelf = currentUserId != null && admin.userId === currentUserId;

          return (
            <Card key={admin.id}>
              <CardContent className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={admin.profilePhoto || undefined} alt={admin.name} />
                  <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-medium">{admin.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{admin.email}</p>
                  {admin.contactNumber && (
                    <p className="truncate text-xs text-muted-foreground">{admin.contactNumber}</p>
                  )}
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Badge variant={role === "SUPER_ADMIN" ? "default" : "outline"}>{role.replace("_", " ")}</Badge>
                    <Badge variant={status === "ACTIVE" ? "secondary" : "outline"}>{status}</Badge>
                  </div>
                </div>

                {canManage && !isSelf && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="size-4" aria-hidden="true" />
                        <span className="sr-only">Admin actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          statusMutation.mutate({
                            userId: admin.userId,
                            status: status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
                          })
                        }
                      >
                        <UserX className="mr-2 size-4" aria-hidden="true" />
                        {status === "ACTIVE" ? "Block" : "Unblock"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          roleMutation.mutate({
                            userId: admin.userId,
                            role: role === "SUPER_ADMIN" ? "ADMIN" : "SUPER_ADMIN",
                          })
                        }
                      >
                        <ShieldCheck className="mr-2 size-4" aria-hidden="true" />
                        {role === "SUPER_ADMIN" ? "Demote to Admin" : "Promote to Super Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => {
                          setDeletingAdmin(admin);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <DeleteAdminConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        admin={deletingAdmin}
      />
    </>
  );
};

export default AdminsManagementTable;
