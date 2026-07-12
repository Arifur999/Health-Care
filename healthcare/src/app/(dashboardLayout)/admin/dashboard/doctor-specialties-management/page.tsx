import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowRight, Stethoscope } from "lucide-react"
import Link from "next/link"

const DoctorSpecialtiesManagementPage = () => {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Doctor Specialties</h1>
        <p className="text-sm text-muted-foreground">
          How doctor-specialty assignment actually works in this system.
        </p>
      </div>

      <Card className="border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <CardTitle className="text-base">This page is intentionally minimal</CardTitle>
          </div>
          <CardDescription className="pt-1 leading-relaxed">
            The backend does not currently expose a real &quot;doctor specialties&quot; endpoint. In the
            backend&apos;s route registration, both{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">/doctor-schedules</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">/doctor-specialties</code> are mounted
            to the exact same router — so this path only ever re-serves doctor schedule data under a
            misleading name. Building a CRUD screen against it here would edit schedules while claiming
            to manage specialties, so we deliberately did not build one.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="size-5 shrink-0 text-primary" aria-hidden="true" />
            <CardTitle className="text-base">Where this is actually managed</CardTitle>
          </div>
          <CardDescription className="pt-1 leading-relaxed">
            Doctor to specialty assignment works today through{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">PATCH /doctors/:id</code> with a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">specialties</code> array. Use the
            Doctors Management page to edit a doctor and add or remove their specialties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/admin/dashboard/doctors-management">
              Go to Doctors Management
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default DoctorSpecialtiesManagementPage
