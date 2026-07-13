import { getAllSpecialties } from "@/services/doctor.services"
import { type ISpecialty } from "@/types/specialty.types"
import { Heart } from "lucide-react"
import Link from "next/link"

const SPECIALTIES_FILTER_KEY = "specialties.specialty.title"

const OurSpecialties = async () => {
  const specialtiesResponse = await getAllSpecialties().catch(() => null)
  const specialties = specialtiesResponse?.data ?? []

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Always Caring</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">Our Specialties</h2>
      </div>

      {specialties.length === 0 ? (
        <div className="mx-auto mt-10 w-full max-w-6xl rounded-[5px] border border-primary/10 px-4 py-10 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          Specialties will appear here once they are added by the care team.
        </div>
      ) : (
        <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-2 border border-primary/10 sm:grid-cols-3 lg:grid-cols-4 lg:px-8">
          {specialties.slice(0, 12).map((specialty: ISpecialty, index: number) => (
            <Link
              key={specialty.id}
              href={`/consultation?${SPECIALTIES_FILTER_KEY}=${encodeURIComponent(specialty.title)}`}
              className={`group flex flex-col items-center justify-center gap-4 border border-primary/10 px-4 py-10 transition-colors ${
                index === 1 ? "bg-primary text-secondary" : "hover:bg-secondary/20"
              }`}
            >
              <span className="flex size-11 items-center justify-center overflow-hidden">
                {specialty.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={specialty.icon} alt="" className="size-full object-contain" />
                ) : (
                  <Heart
                    className={`size-9 ${index === 1 ? "text-secondary" : "text-primary"}`}
                    aria-hidden="true"
                  />
                )}
              </span>
              <p className="text-base">{specialty.title}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default OurSpecialties
