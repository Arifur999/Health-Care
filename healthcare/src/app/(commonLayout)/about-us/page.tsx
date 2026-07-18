import ContactSection from "@/components/modules/home/ContactSection"
import NewsSection from "@/components/modules/home/NewsSection"
import OurDoctorsSection from "@/components/modules/home/OurDoctorsSection"
import TestimonialBanner from "@/components/modules/home/TestimonialBanner"
import InnerPageHero from "@/components/shared/InnerPageHero"
import PassionForPatientsBlock from "@/components/shared/PassionForPatientsBlock"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about MEDdical's mission, our specialists, and our commitment to patient-first care.",
}

const AboutUsPage = () => {
  return (
    <>
      <InnerPageHero
        title="About Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="/images/banners/about.jpg"
      />

      <PassionForPatientsBlock
        eyebrow="Welcome to Meddical"
        title="Best Care for Your Good Health"
        image="/images/home/doctor-card-3.jpg"
        description={[
          "Meddical brings together specialists, diagnostics, and digital records so every visit builds on the last one instead of starting from scratch.",
          "We believe good care is coordinated care — your doctor, prescriptions, and follow-ups all stay connected inside one dashboard.",
        ]}
      />

      <TestimonialBanner />
      <OurDoctorsSection pageSize={3} fetchLimit={9} />
      <NewsSection />
      <ContactSection />
    </>
  )
}

export default AboutUsPage
