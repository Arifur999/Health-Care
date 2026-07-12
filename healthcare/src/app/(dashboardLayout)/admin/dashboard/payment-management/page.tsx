import AppointmentPaymentStatusTable from "@/components/modules/Admin/PaymentManagement/AppointmentPaymentStatusTable"
import PaymentGapNotice from "@/components/modules/Admin/PaymentManagement/PaymentGapNotice"
import { getAllAppointments } from "@/services/appointment.services"

const PaymentManagementPage = async () => {
  const appointmentsResponse = await getAllAppointments().catch(() => null)
  const appointments = appointmentsResponse?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Payment Management</h1>
        <p className="text-sm text-muted-foreground">
          Review payment status across appointments.
        </p>
      </div>

      <PaymentGapNotice />

      <AppointmentPaymentStatusTable appointments={appointments} />
    </div>
  )
}

export default PaymentManagementPage
