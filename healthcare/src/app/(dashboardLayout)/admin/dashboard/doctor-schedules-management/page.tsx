import DoctorSchedulesManagementTable from "@/components/modules/Admin/DoctorSchedulesManagement/DoctorSchedulesManagementTable"
import { getAllDoctorSchedules } from "@/services/doctorSchedule.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const DoctorSchedulesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const queryParamsObjects = await searchParams

  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key]

      if (value === undefined) {
        return ""
      }

      if (Array.isArray(value)) {
        return value
          .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join("&")
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .filter(Boolean)
    .join("&")

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["admin-doctor-schedules", queryString],
    queryFn: () => getAllDoctorSchedules(queryString),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Doctor Schedules</h1>
          <p className="text-sm text-muted-foreground">
            All schedule slots assigned to doctors across the platform.
          </p>
        </div>

        <DoctorSchedulesManagementTable initialQueryString={queryString} />
      </div>
    </HydrationBoundary>
  )
}

export default DoctorSchedulesManagementPage
