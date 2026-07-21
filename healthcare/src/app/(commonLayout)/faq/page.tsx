import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import InnerPageHero from "@/components/shared/InnerPageHero"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about booking appointments, payments, prescriptions, and your account on MEDdical.",
}

const faqGroups = [
  {
    title: "Booking appointments",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Go to Doctors, pick a specialist by specialty, fee, or availability, then choose an open time slot on their profile. You'll need to be logged in to confirm the booking.",
      },
      {
        question: "Can I cancel or reschedule an appointment?",
        answer:
          "Yes -- open My Appointments from your dashboard to see your upcoming bookings and their status.",
      },
      {
        question: "What happens if I don't pay for my appointment?",
        answer:
          "Appointments left unpaid for a while are automatically cancelled so the slot can be freed up for other patients.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "How do I pay for a consultation?",
        answer:
          "Appointment fees are set by each doctor and shown before you confirm a booking. Payment is handled securely through our payment provider once you confirm.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refunds are handled case-by-case -- reach out through the Contact page with your appointment details and we'll help.",
      },
    ],
  },
  {
    title: "Prescriptions and records",
    items: [
      {
        question: "Where can I see my prescriptions?",
        answer:
          "Once your doctor issues one after a consultation, it appears under My Prescriptions in your dashboard.",
      },
      {
        question: "Who can see my health records?",
        answer:
          "Only you and the doctor(s) you've booked with can see your health records and appointment history -- see our Privacy Policy for the full details.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "How do doctors get listed on MEDdical?",
        answer:
          "Doctors are onboarded and verified by our admin team before they appear in the directory, so every doctor you see has been checked.",
      },
      {
        question: "I forgot my password -- what do I do?",
        answer:
          "Use the Forgot Password link on the login page to get a reset code sent to your email.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Go to My Profile from your dashboard to update your details at any time.",
      },
    ],
  },
]

const FaqPage = () => {
  return (
    <>
      <InnerPageHero
        title="FAQ"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        image="/images/banners/contact.jpg"
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {faqGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h2 className="font-display text-xl text-primary sm:text-2xl">{group.title}</h2>
              <Accordion type="single" collapsible>
                {group.items.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger className="text-base text-foreground">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <p className="text-center text-sm text-muted-foreground">
            Still have questions? <Link href="/contact" className="text-primary underline underline-offset-2 hover:text-accent">Contact us</Link> and we'll help.
          </p>
        </div>
      </section>
    </>
  )
}

export default FaqPage
