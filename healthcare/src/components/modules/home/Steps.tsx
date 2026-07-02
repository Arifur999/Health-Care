import { Button } from "@/components/ui/button"
import { CalendarPlus, FileCheck2, SearchCheck, Video } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    title: "Search the right care",
    description: "Browse specialists, compare fees, review experience, and open a doctor profile before making a decision.",
    icon: SearchCheck,
  },
  {
    title: "Book your appointment",
    description: "Choose a suitable schedule and confirm your appointment from the web application in a few focused steps.",
    icon: CalendarPlus,
  },
  {
    title: "Consult and follow up",
    description: "Meet the doctor, receive prescriptions, and keep your appointment history available inside your dashboard.",
    icon: Video,
  },
]

const Steps = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Take healthcare services without the usual friction.
            </h2>
            <p className="text-muted-foreground">
              The platform keeps discovery, booking, consultation, and health records connected so patients can move from need to care with confidence.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/consultation">
              <FileCheck2 className="size-4" aria-hidden="true" />
              Start Now
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <article key={step.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Steps
