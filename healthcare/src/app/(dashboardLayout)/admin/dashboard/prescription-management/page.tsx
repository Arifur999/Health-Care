import PrescriptionsManagementTable from "@/components/modules/Admin/PrescriptionManagement/PrescriptionsManagementTable"
import { getAllPrescriptions } from "@/services/prescription.services"

const PrescriptionManagementPage = async () => {
  const prescriptionsResponse = await getAllPrescriptions().catch(() => null)
  const prescriptions = prescriptionsResponse?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Prescription Management</h1>
        <p className="text-sm text-muted-foreground">
          Read-only overview of every prescription doctors have issued.
        </p>
      </div>

      <PrescriptionsManagementTable prescriptions={prescriptions} />
    </div>
  )
}

export default PrescriptionManagementPage
