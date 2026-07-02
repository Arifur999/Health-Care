import { Button } from "@/components/ui/button"
import { Activity, CalendarDays, Search, ShieldCheck, Star, Users } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Specialist Doctors", value: "120+" },
  { label: "Care Services", value: "24/7" },
  { label: "Patient Rating", value: "4.9" },
]

const Hero = () => {
  return (
    <section className="bg-linear-to-br from-background via-blue-50/70 to-cyan-50/80">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm font-medium text-primary shadow-sm">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Trusted digital healthcare support
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Care that reaches you faster, wherever you are.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find qualified doctors, book appointments, track prescriptions, and manage essential healthcare services from one responsive platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/consultation">
                <Search className="size-4" aria-hidden="true" />
                Find Doctors
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard/book-appointments">
                <CalendarDays className="size-4" aria-hidden="true" />
                Book Appointment
              </Link>
            </Button>
          </div>

          <div className="grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl border bg-background/80 p-4 shadow-sm">
                <p className="text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border bg-background shadow-xl">
            <div className="border-b bg-muted/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today&apos;s Care Desk</p>
                  <h2 className="text-xl font-semibold">Available specialists</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Live
                </span>
              </div>
            </div>

            <div className="grid gap-4 p-5">
              {[
                ["Dr. Sarah Ahmed", "Cardiology", "09:30 AM", "98%"],
                ["Dr. Arif Rahman", "Neurology", "11:00 AM", "96%"],
                ["Dr. Maya Chowdhury", "Pediatrics", "02:15 PM", "99%"],
              ].map(([name, specialty, time, score]) => (
                <div key={name} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Users className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium">{name}</h3>
                    <p className="text-sm text-muted-foreground">{specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{time}</p>
                    <p className="flex items-center justify-end gap-1 text-xs text-amber-600">
                      <Star className="size-3 fill-current" aria-hidden="true" />
                      {score}
                    </p>
                  </div>
                </div>
              ))}

              <div className="grid gap-3 rounded-2xl border bg-primary p-4 text-primary-foreground sm:grid-cols-[auto_1fr]">
                <div className="flex size-11 items-center justify-center rounded-full bg-white/15">
                  <Activity className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">Care coordination made simple</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Appointments, reports, consultation history, and payments stay connected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
