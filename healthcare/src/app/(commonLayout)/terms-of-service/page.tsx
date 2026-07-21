import InnerPageHero from "@/components/shared/InnerPageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of MEDdical's appointment booking and care platform.",
}

const sections = [
  {
    title: "1. Using MEDdical",
    body: [
      "MEDdical connects patients with doctors for consultations, prescriptions, and diagnostic services. You must provide accurate information when registering and booking appointments.",
      "You're responsible for keeping your account credentials secure, and for any activity that happens under your account.",
    ],
  },
  {
    title: "2. Appointments and payments",
    body: [
      "Booking an appointment reserves a specific doctor's time slot. Appointments left unpaid for an extended period may be automatically cancelled to free up the slot for other patients.",
      "Paid appointments are processed through our payment provider. Refunds, where applicable, are handled case-by-case -- contact us through the Contact page.",
      "Appointment fees are set by each doctor and shown before you confirm a booking.",
    ],
  },
  {
    title: "3. Medical information and advice",
    body: [
      "MEDdical is a platform that connects you with licensed doctors -- it does not itself provide medical advice or diagnoses.",
      "Prescriptions, diagnoses, and treatment plans are the responsibility of the treating doctor. In a medical emergency, contact emergency services directly rather than booking through the platform.",
    ],
  },
  {
    title: "4. Doctor accounts",
    body: [
      "Doctors on the platform are onboarded and verified by our admin team, and are responsible for keeping their qualifications, schedule, and availability accurate.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "Don't use the platform to submit false health information, impersonate another person, or interfere with other users' access to the service.",
      "Reviews should reflect your genuine experience with a doctor -- reviews are only enabled after a completed, paid appointment.",
    ],
  },
  {
    title: "6. Changes to these terms",
    body: [
      "We may update these terms from time to time as the platform evolves. Continued use of MEDdical after an update means you accept the revised terms.",
    ],
  },
  {
    title: "7. Contact us",
    body: [
      "Questions about these terms can be sent through our Contact page or to support@meddical.com.",
    ],
  },
]

const TermsOfServicePage = () => {
  return (
    <>
      <InnerPageHero
        title="Terms of Service"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        image="/images/banners/contact.jpg"
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">Last updated: 2026</p>

          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="font-display text-xl text-primary sm:text-2xl">{section.title}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index} className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default TermsOfServicePage
