import AdminsManagementTable from "@/components/modules/Admin/AdminsManagement/AdminsManagementTable"
import { getAllAdmins } from "@/services/admin.services"
import { getUserInfo } from "@/services/auth.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const AdminsManagementPage = async () => {
  const queryClient = new QueryClient()
  const currentUser = await getUserInfo()

  await queryClient.prefetchQuery({
    queryKey: ["admin-admins"],
    queryFn: getAllAdmins,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Admins</h1>
          <p className="text-sm text-muted-foreground">
            All admin and super admin accounts on the platform.
          </p>
        </div>

        <AdminsManagementTable
          currentUserRole={currentUser?.role ?? "ADMIN"}
          currentUserId={currentUser?.id}
        />
      </div>
    </HydrationBoundary>
  )
}

export default AdminsManagementPage
