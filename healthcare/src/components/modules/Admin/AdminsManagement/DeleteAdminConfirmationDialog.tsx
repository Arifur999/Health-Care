"use client"

import { deleteAdminAction } from "@/app/(dashboardLayout)/admin/dashboard/admins-management/_action"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { type IAdminListItem } from "@/types/admin.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface DeleteAdminConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  admin: IAdminListItem | null
}

const DeleteAdminConfirmationDialog = ({ open, onOpenChange, admin }: DeleteAdminConfirmationDialogProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteAdminAction,
  })

  const handleConfirmDelete = async () => {
    if (!admin) {
      toast.error("Admin not found")
      return
    }

    const result = await mutateAsync(admin.id)

    if (!result.success) {
      toast.error(result.message || "Failed to delete admin")
      return
    }

    toast.success("Admin deleted successfully")
    onOpenChange(false)
    void queryClient.invalidateQueries({ queryKey: ["admin-admins"] })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Admin</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {admin?.name ?? "this admin"}? This action will mark the admin and
            linked user as deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(event) => {
              event.preventDefault()
              void handleConfirmDelete()
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAdminConfirmationDialog
