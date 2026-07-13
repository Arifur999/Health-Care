import BookAppointmentSection from "@/components/modules/home/BookAppointmentSection"
import ContactSection from "@/components/modules/home/ContactSection"
import Hero from "@/components/modules/home/Hero"
import NewsSection from "@/components/modules/home/NewsSection"
import OurDoctorsSection from "@/components/modules/home/OurDoctorsSection"
import OurServicesSection from "@/components/modules/home/OurServicesSection"
import OurSpecialties from "@/components/modules/home/OurSpecialties"
import WelcomeSection from "@/components/modules/home/WelcomeSection"

const CommonLayoutPage = () => {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <OurServicesSection />
      <OurSpecialties />
      <BookAppointmentSection />
      <OurDoctorsSection />
      <NewsSection />
      <ContactSection />
    </>
  )
}

export default CommonLayoutPage
