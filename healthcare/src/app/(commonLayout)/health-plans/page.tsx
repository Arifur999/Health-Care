import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Get started with core healthcare access for individuals.",
    features: [
      "Book unlimited appointments",
      "Digital prescription history",
      "Doctor and review browsing",
    ],
    highlighted: false,
  },
  {
    name: "Family",
    price: "৳499",
    period: "/month",
    description: "Coordinated care for you and up to 4 family members.",
    features: [
      "Everything in Basic",
      "Priority appointment slots",
      "Shared health records for family members",
      "Discounted diagnostic packages",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "৳999",
    period: "/month",
    description: "Extended care with faster access to specialists.",
    features: [
      "Everything in Family",
      "24/7 priority care desk support",
      "Free annual full body checkup",
      "Dedicated care coordinator",
    ],
    highlighted: false,
  },
]

const HealthPlansPage = () => {
  return (
    <>
      <InnerPageHero
        title="Health Plans"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Health Plans" }]}
        image="/images/home/service-photo-2.jpg"
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
                  plan.highlighted ? "border-primary bg-primary text-primary-foreground" : "bg-card"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 right-6 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-950">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p
                  className={`mt-2 text-sm ${
                    plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold">{plan.price}</span>
                  {plan.period && <span className="text-sm opacity-80">{plan.period}</span>}
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "secondary" : "default"}
                  asChild
                >
                  <Link href="/register">Choose {plan.name}</Link>
                </Button>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Plans can be upgraded or cancelled anytime from your account settings.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default HealthPlansPage
