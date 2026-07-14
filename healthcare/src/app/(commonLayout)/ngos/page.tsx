import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import { Droplets, HandHeart, Heart, Mail, Tent, Users } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    title: "Free Health Camps",
    description: "Community screening camps offering free consultations and basic diagnostics in underserved areas.",
    icon: Tent,
  },
  {
    title: "Rural Outreach",
    description: "Bringing specialist consultations to rural communities through partner clinics and volunteer doctors.",
    icon: Users,
  },
  {
    title: "Blood Donation Network",
    description: "Connecting willing donors with patients and hospitals in urgent need of blood.",
    icon: Droplets,
  },
  {
    title: "Mental Health Support",
    description: "Free counseling sessions and awareness programs run with mental health partner organizations.",
    icon: Heart,
  },
]

const NgosPage = () => {
  return (
    <>
      <InnerPageHero
        title="Community & NGOs"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "NGOs" }]}
        image="/images/home/appointment-bg.jpg"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Button size="lg" asChild className="rounded-full bg-secondary text-primary hover:bg-secondary/90">
          <Link href="mailto:partnerships@meddical.com">
            <HandHeart className="size-4" aria-hidden="true" />
            Become a Partner
          </Link>
        </Button>
      </div>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Our programs</p>
            <h2 className="font-display text-3xl text-primary sm:text-4xl">
              Community initiatives we support.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <article key={program.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{program.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{program.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 rounded-2xl border bg-card p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="text-xl font-semibold">Want to volunteer or refer a community in need?</h2>
              <p className="text-sm text-muted-foreground">
                Reach out to our partnerships team and we will get back to you about upcoming health camps and outreach programs.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="mailto:partnerships@meddical.com">
                <Mail className="size-4" aria-hidden="true" />
                Contact Partnerships Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default NgosPage
