import DoctorAppointmentsList from "@/components/modules/Doctor/Appointments/DoctorAppointmentsList"
import { getMyAppointments } from "@/services/appointment.services"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const DoctorAppointmentsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["doctor-appointments"],
    queryFn: getMyAppointments,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Appointments</h1>
          <p className="text-sm text-muted-foreground">
            Review your appointments and update their status.
          </p>
        </div>
        <DoctorAppointmentsList />
      </div>
    </HydrationBoundary>
  )
}

export default DoctorAppointmentsPage
