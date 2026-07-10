import PageHeroBanner from "@/components/shared/PageHeroBanner"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Baby,
  Bone,
  CalendarCheck,
  Clock,
  Home,
  Microscope,
  ShieldCheck,
  Stethoscope,
  TestTube2,
} from "lucide-react"
import Link from "next/link"

const testCategories = [
  {
    title: "Blood & Pathology",
    description: "CBC, blood sugar, lipid profile, thyroid, and full pathology panels.",
    icon: TestTube2,
  },
  {
    title: "Imaging & X-Ray",
    description: "Digital X-ray, ultrasound, MRI, and CT scans read by certified radiologists.",
    icon: Bone,
  },
  {
    title: "Cardiac Screening",
    description: "ECG, echocardiogram, and stress tests for heart health monitoring.",
    icon: Activity,
  },
  {
    title: "Full Body Checkup",
    description: "Comprehensive packages that combine multiple tests into one visit.",
    icon: Stethoscope,
  },
  {
    title: "Home Sample Collection",
    description: "A technician visits you to collect samples at a time that works for you.",
    icon: Home,
  },
  {
    title: "Maternal & Child",
    description: "Prenatal screening, growth monitoring, and pediatric diagnostic panels.",
    icon: Baby,
  },
]

const steps = [
  {
    title: "Choose your test",
    description: "Pick individual tests or a checkup package based on what your doctor recommends.",
    icon: TestTube2,
  },
  {
    title: "Schedule collection",
    description: "Book a home sample collection or visit a partner diagnostic center near you.",
    icon: Clock,
  },
  {
    title: "Get digital reports",
    description: "Reports are shared digitally and can be reviewed with your doctor on the platform.",
    icon: Microscope,
  },
]

const DiagnosticsPage = () => {
  return (
    <>
      <PageHeroBanner
        eyebrow="Diagnostics"
        title="Lab tests and imaging, without the wait."
        description="Book blood tests, imaging, and full body checkups with certified labs, then discuss the results with a specialist on the same platform."
        action={
          <Button size="lg" asChild>
            <Link href="/consultation">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Consult a Doctor About Your Results
            </Link>
          </Button>
        }
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Test categories</span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Diagnostics for every need.</h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testCategories.map((category) => {
              const Icon = category.icon
              return (
                <article key={category.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Three steps to your report.</h2>
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
                    <span className="text-sm font-semibold text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </article>
              )
            })}
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-2xl border bg-card p-5">
            <ShieldCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              All partner labs are accredited, and every report is reviewed for accuracy before it reaches your dashboard.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default DiagnosticsPage
