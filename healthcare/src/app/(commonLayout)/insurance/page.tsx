import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import { FileCheck2, ShieldCheck, Wallet, Building2, ClipboardList, HeartPulse } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Insurance",
  description: "How health insurance works with MEDdical — accepted providers, cashless claims, and reimbursement support.",
}

const partners = [
  "Green Delta Insurance",
  "MetLife Bangladesh",
  "Pragati Insurance",
  "Guardian Life Insurance",
  "Delta Life Insurance",
  "Sadharan Bima Corporation",
]

const steps = [
  {
    icon: ClipboardList,
    title: "Share your policy",
    description: "Add your insurance provider and policy number to your profile when booking an appointment.",
  },
  {
    icon: FileCheck2,
    title: "We verify coverage",
    description: "Our care desk checks your eligibility with the insurer before your consultation or procedure.",
  },
  {
    icon: Wallet,
    title: "Cashless or reimbursed",
    description: "Where the provider supports it, you pay nothing at the point of care; otherwise we help you file for reimbursement.",
  },
]

const benefits = [
  {
    icon: ShieldCheck,
    title: "Coverage clarity",
    description: "Know exactly what's covered before you book — no surprise bills after your visit.",
  },
  {
    icon: Building2,
    title: "Wide network",
    description: "We work with major Bangladeshi insurers and keep adding partners across the country.",
  },
  {
    icon: HeartPulse,
    title: "Support for claims",
    description: "Our team helps you gather prescriptions, reports, and receipts needed for a smooth claim.",
  },
]

const InsurancePage = () => {
  return (
    <>
      <InnerPageHero
        title="Insurance"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insurance" }]}
        image="/images/banners/about.jpg"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Button size="lg" asChild className="rounded-full bg-secondary text-primary hover:bg-secondary/90">
          <Link href="/contact">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Ask about your coverage
          </Link>
        </Button>
      </div>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">How it works</p>
            <h2 className="font-display text-3xl text-primary sm:text-4xl">
              Use your health insurance with MEDdical.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="relative rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="absolute right-5 top-5 font-display text-4xl text-secondary/50">{index + 1}</span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Accepted providers</p>
            <h2 className="font-display text-3xl text-primary sm:text-4xl">
              Insurers we work with.
            </h2>
            <p className="text-sm text-muted-foreground">
              Don&apos;t see your provider? Contact us — our network is growing, and we may still be able to help you claim.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div key={partner} className="flex items-center gap-3 rounded-2xl border bg-card p-5 shadow-sm">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Building2 className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <article key={benefit.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default InsurancePage
