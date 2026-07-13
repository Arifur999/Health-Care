import AppointmentFormSection from "@/components/modules/Appointment/AppointmentFormSection"
import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import MapEmbed from "@/components/shared/MapEmbed"

const AppointmentPage = () => {
  return (
    <>
      <InnerPageHero title="Book an Appointment" breadcrumb={[{ label: "Home", href: "/" }, { label: "Appointment" }]} />
      <AppointmentFormSection />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <MapEmbed query="Dhaka, Bangladesh" />
      </div>

      <ContactSection />
    </>
  )
}

export default AppointmentPage
