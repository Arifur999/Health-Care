import AppointmentFormSection from "@/components/modules/Appointment/AppointmentFormSection"
import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import MapEmbed from "@/components/shared/MapEmbed"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Tell us who you'd like to see and we'll take you straight to their schedule.",
}

const AppointmentPage = () => {
  return (
    <>
      <InnerPageHero
        title="Book an Appointment"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Appointment" }]}
        image="/images/banners/appointment.jpg"
      />
      <AppointmentFormSection />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <MapEmbed query="Dhaka, Bangladesh" />
      </div>

      <ContactSection />
    </>
  )
}

export default AppointmentPage
