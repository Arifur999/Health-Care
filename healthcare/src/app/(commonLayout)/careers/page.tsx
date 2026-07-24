import DoctorApplicationForm from "@/components/modules/Careers/DoctorApplicationForm"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { CalendarCheck, HeartPulse, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join as a Doctor",
  description:
    "Apply to join MEDdical as a doctor. Manage your schedule, consult patients in-person or over video, and grow your practice with a trusted medical platform.",
}

const benefits = [
  {
    icon: CalendarCheck,
    title: "Manage your own schedule",
    description: "Publish availability, and let patients book open slots that fit your day.",
  },
  {
    icon: Users,
    title: "Reach more patients",
    description: "Get discovered by patients searching for your specialty across the platform.",
  },
  {
    icon: HeartPulse,
    title: "In-person or video",
    description: "Consult the way you prefer — in the clinic or over a secure video call.",
  },
]

const CareersPage = () => {
  return (
    <>
      <InnerPageHero
        title="Join as a Doctor"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Join as a Doctor" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-display text-sm uppercase tracking-wide text-accent">Careers</p>
          <h2 className="mt-2 font-display text-3xl text-primary sm:text-4xl">
            Practice medicine, powered by MEDdical
          </h2>
          <p className="mt-3 text-muted-foreground">
            We&apos;re always looking for qualified, registered doctors to join our network. Submit
            your details below — our team reviews every application and, once approved, we&apos;ll set
            up your account so you can start seeing patients.
          </p>
        </div>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-secondary/40">
                <benefit.icon className="size-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-primary">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <DoctorApplicationForm />
      </section>
    </>
  )
}

export default CareersPage
