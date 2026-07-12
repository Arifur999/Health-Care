import HealthRecordsForm from "@/components/modules/Patient/HealthRecords/HealthRecordsForm"
import { getUserInfo } from "@/services/auth.services"
import { type IMeResponse } from "@/types/user.types"
import { redirect } from "next/navigation"

const HealthRecordsPage = async () => {
  const currentUser: IMeResponse | null = await getUserInfo()

  if (!currentUser || !currentUser.patient) {
    redirect("/login")
  }

  return (
    <HealthRecordsForm
      healthData={currentUser.patient.patientHealthData}
      medicalReports={currentUser.patient.medicalReports ?? []}
    />
  )
}

export default HealthRecordsPage
