import InnerPageHero from "@/components/shared/InnerPageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MEDdical collects, uses, and protects your personal and health information.",
}

const sections = [
  {
    title: "1. Information we collect",
    body: [
      "When you register, book an appointment, or complete your profile, we collect information such as your name, email address, phone number, and address.",
      "When you're treated by a doctor on the platform, your care team may record health-related information as part of your patient profile, prescriptions, and medical reports -- this is only ever visible to you and the doctors involved in your care, plus admins where strictly necessary for account and platform administration.",
      "We also collect basic technical information (like device and browser type) to keep the platform secure and working correctly.",
    ],
  },
  {
    title: "2. How we use your information",
    body: [
      "To create and manage your account, and to connect you with the right doctor for your appointment.",
      "To let your doctor issue prescriptions and review your appointment and health history.",
      "To process payments for paid appointments through our payment provider.",
      "To send you appointment confirmations, reminders, and account-related notifications.",
    ],
  },
  {
    title: "3. Who can see your information",
    body: [
      "Your health records, prescriptions, and appointment details are only accessible to you, the doctor(s) you've booked with, and platform administrators who need it to operate the service.",
      "We do not sell your personal or health information to third parties.",
      "Doctor profiles (name, specialty, qualifications, fee) are public, since patients need this information to choose a doctor -- your appointment and health history is not part of this public profile.",
    ],
  },
  {
    title: "4. Data security",
    body: [
      "We use industry-standard practices to protect your account, including encrypted password storage and secure session handling.",
      "Access to patient and doctor records is role-restricted -- only the roles that need specific data (patient, doctor, admin) can access it, and only for what their role requires.",
    ],
  },
  {
    title: "5. Your choices",
    body: [
      "You can review and update your profile information at any time from your dashboard.",
      "You can request account deletion by contacting us -- see the Contact page for details.",
    ],
  },
  {
    title: "6. Contact us",
    body: [
      "If you have questions about this policy or how your data is handled, reach out through our Contact page or email support@meddical.com.",
    ],
  },
]

const PrivacyPolicyPage = () => {
  return (
    <>
      <InnerPageHero
        title="Privacy Policy"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
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

export default PrivacyPolicyPage
