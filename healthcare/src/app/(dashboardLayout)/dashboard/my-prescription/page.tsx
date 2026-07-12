import MyPrescriptionsList from "@/components/modules/Patient/Prescriptions/MyPrescriptionsList"
import { getMyPrescriptions } from "@/services/prescription.services"

const MyPrescriptionPage = async () => {
  const prescriptionsResponse = await getMyPrescriptions().catch(() => null)
  const prescriptions = prescriptionsResponse?.data ?? []

  return <MyPrescriptionsList prescriptions={prescriptions} />
}

export default MyPrescriptionPage
