import { getAllSpecialties } from "@/services/doctor.services"
import { type ISpecialty } from "@/types/specialty.types"
import { Stethoscope } from "lucide-react"
import Link from "next/link"

const SPECIALTIES_FILTER_KEY = "specialties.specialty.title"

const OurServices = async () => {
  const specialtiesResponse = await getAllSpecialties().catch(() => null)
  const specialties = specialtiesResponse?.data ?? []

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">Our specialties</span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Care organized around every specialty you need.
          </h2>
          <p className="text-muted-foreground">
            Explore departments across the platform and jump straight to specialists relevant to your condition.
          </p>
        </div>

        {specialties.length === 0 ? (
          <div className="mt-10 rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
            Specialties will appear here once they are added by the care team.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {specialties.slice(0, 12).map((specialty: ISpecialty) => (
              <Link
                key={specialty.id}
                href={`/consultation?${SPECIALTIES_FILTER_KEY}=${encodeURIComponent(specialty.title)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary">
                  {specialty.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={specialty.icon} alt={specialty.title} className="size-full object-cover" />
                  ) : (
                    <Stethoscope className="size-6" aria-hidden="true" />
                  )}
                </span>
                <span className="text-sm font-medium leading-tight group-hover:text-primary">
                  {specialty.title}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default OurServices
