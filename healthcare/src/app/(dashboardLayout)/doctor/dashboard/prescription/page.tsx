import PrescriptionForm from "@/components/modules/Doctor/Prescriptions/PrescriptionForm"
import PrescriptionsList from "@/components/modules/Doctor/Prescriptions/PrescriptionsList"

interface PrescriptionPageProps {
  searchParams: Promise<{ appointmentId?: string }>
}

const PrescriptionPage = async ({ searchParams }: PrescriptionPageProps) => {
  const params = await searchParams

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Prescriptions</h1>
        <p className="text-sm text-muted-foreground">
          Write new prescriptions and manage the ones you have already issued.
        </p>
      </div>

      {params.appointmentId && <PrescriptionForm appointmentId={params.appointmentId} />}

      <PrescriptionsList />
    </div>
  )
}

export default PrescriptionPage
