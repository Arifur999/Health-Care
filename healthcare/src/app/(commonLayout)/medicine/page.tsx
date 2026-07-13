import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import {
  Baby,
  BadgeCheck,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  Truck,
  UploadCloud,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Prescription Medicines",
    description: "Upload a prescription from your consultation and get medicines matched to it.",
    icon: Pill,
  },
  {
    title: "OTC & Wellness",
    description: "Everyday health essentials, supplements, and wellness products.",
    icon: HeartPulse,
  },
  {
    title: "Devices & Equipment",
    description: "Blood pressure monitors, glucometers, nebulizers, and home care devices.",
    icon: Stethoscope,
  },
  {
    title: "Mother & Baby Care",
    description: "Curated essentials for prenatal care, newborns, and growing children.",
    icon: Baby,
  },
]

const steps = [
  {
    title: "Upload your prescription",
    description: "Add prescription files from your dashboard health records after a consultation.",
    icon: UploadCloud,
  },
  {
    title: "Pharmacist verification",
    description: "A licensed pharmacist reviews the prescription before your order is confirmed.",
    icon: BadgeCheck,
  },
  {
    title: "Doorstep delivery",
    description: "Receive your medicines in discreet, temperature-safe packaging.",
    icon: Truck,
  },
]

const MedicinePage = () => {
  return (
    <>
      <InnerPageHero title="Medicine" breadcrumb={[{ label: "Home", href: "/" }, { label: "Medicine" }]} />

      <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-3 px-4 pt-10 sm:px-6 lg:px-8">
        <Button size="lg" asChild className="rounded-full bg-secondary text-primary hover:bg-secondary/90">
          <Link href="/dashboard/health-records">
            <UploadCloud className="size-4" aria-hidden="true" />
            Upload Prescription
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="rounded-full">
          <Link href="/consultation">Talk to a Doctor First</Link>
        </Button>
      </div>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Categories</p>
            <h2 className="font-display text-3xl text-primary sm:text-4xl">Everything your care plan needs.</h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
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
            <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">How it works</p>
            <h2 className="font-display text-3xl text-primary sm:text-4xl">From prescription to delivery.</h2>
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
              Every order is checked by a licensed pharmacist, and prescription medicines are never dispensed without a valid prescription on file.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default MedicinePage
