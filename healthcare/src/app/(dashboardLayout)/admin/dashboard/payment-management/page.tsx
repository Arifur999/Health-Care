import PaymentsManagementTable from "@/components/modules/Admin/PaymentManagement/PaymentsManagementTable"
import { getAllPayments } from "@/services/payment.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const PaymentManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["admin-payments"],
    queryFn: getAllPayments,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Payment Management</h1>
          <p className="text-sm text-muted-foreground">
            Review transactions across all appointments.
          </p>
        </div>

        <PaymentsManagementTable />
      </div>
    </HydrationBoundary>
  )
}

export default PaymentManagementPage
