import { ClipboardList, Lock, PhoneCall, Stethoscope } from "lucide-react"

const features = [
  {
    title: "Verified specialists",
    description: "Every doctor profile is reviewed with registration, qualification, and experience before going live.",
    icon: Stethoscope,
  },
  {
    title: "Digital prescriptions",
    description: "Prescriptions, follow-up dates, and instructions are stored in your dashboard right after consultation.",
    icon: ClipboardList,
  },
  {
    title: "Secure payments",
    description: "Appointment payments are processed securely, with pay-later options for flexible booking.",
    icon: Lock,
  },
  {
    title: "Always reachable support",
    description: "Reach the care desk for booking help, rescheduling, or general questions any time you need.",
    icon: PhoneCall,
  },
]

const WhyChooseUs = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">Why choose us</span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for a smoother healthcare experience.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
