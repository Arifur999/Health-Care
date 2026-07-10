import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getDoctors } from "@/services/doctor.services"
import { type IDoctor } from "@/types/doctor.types"
import { CalendarCheck, MapPin, Star } from "lucide-react"
import Link from "next/link"

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const TopDoctors = async () => {
  const doctorsResponse = await getDoctors(
    "sortBy=averageRating&sortOrder=desc&limit=3",
  ).catch(() => null)

  const doctors = doctorsResponse?.data ?? []

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Top doctors</span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Specialists patients trust most.
            </h2>
            <p className="text-muted-foreground">
              Start with highly rated doctors across common healthcare needs, then explore the full consultation directory.
            </p>
          </div>
          <Button asChild>
            <Link href="/consultation">Show All</Link>
          </Button>
        </div>

        {doctors.length === 0 ? (
          <div className="mt-10 rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
            Doctors will appear here once they are onboarded.
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {doctors.map((doctor: IDoctor) => {
              const specialtiesList = doctor.specialties?.map((item) => item.specialty.title) ?? []

              return (
                <article key={String(doctor.id)} className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Avatar className="size-16 ring-2 ring-secondary">
                      <AvatarImage src={doctor.profilePhoto} alt={doctor.name} />
                      <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {specialtiesList[0] ?? doctor.designation ?? "Specialist"}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-sm font-medium text-amber-600">
                        <Star className="size-4 fill-current" aria-hidden="true" />
                        {doctor.averageRating?.toFixed(1) ?? "New"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="size-4 text-primary" aria-hidden="true" />
                      {doctor.currentWorkingPlace || "Not specified"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{doctor.experience ?? 0} years</Badge>
                      <Badge variant="secondary">${doctor.appointmentFee?.toFixed(0) ?? "N/A"} fee</Badge>
                    </div>
                  </div>

                  <Button className="mt-6 w-full" variant="outline" asChild>
                    <Link href={`/consultation/doctor/${doctor.id}`}>
                      <CalendarCheck className="size-4" aria-hidden="true" />
                      Book Visit
                    </Link>
                  </Button>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default TopDoctors
