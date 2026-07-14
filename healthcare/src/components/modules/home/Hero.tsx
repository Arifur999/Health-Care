import { Button } from "@/components/ui/button"
import { Banknote, CalendarCheck, Users } from "lucide-react"
import Link from "next/link"

const highlights = [
  {
    title: "Book an Appointment",
    icon: CalendarCheck,
    className: "bg-primary text-primary-foreground",
  },
  {
    title: "Expert Doctors",
    icon: Users,
    className: "bg-secondary text-primary",
  },
  {
    title: "Affordable Care",
    icon: Banknote,
    className: "bg-accent text-accent-foreground",
  },
]

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 top-10 size-137.5 rounded-full bg-[#02ddcd]/15 blur-3xl" />
        <div className="absolute -left-40 top-40 size-137.5 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20">
        <div className="space-y-6">
          <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Caring for Life</p>
          <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl">
            Leading the Way
            <br />
            in Medical Excellence
          </h1>
          <Button size="lg" asChild className="rounded-full bg-secondary px-9 py-6 text-base text-primary hover:bg-secondary/90">
            <Link href="/diagnostics">Our Services</Link>
          </Button>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/hero-doctor.jpg"
            alt="Doctor caring for a patient"
            className="h-87.5 w-full rounded-[5px] object-cover sm:h-112.5"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`flex items-center justify-center gap-4 rounded-[5px] px-6 py-6 shadow-lg ${item.className}`}
              >
                <p className="text-base font-medium">{item.title}</p>
                <Icon className="size-9" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-16 sm:h-20" aria-hidden="true" />
    </section>
  )
}

export default Hero
