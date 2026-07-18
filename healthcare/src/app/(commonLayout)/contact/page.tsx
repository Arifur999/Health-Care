import ContactFormSection from "@/components/modules/Contact/ContactFormSection"
import NewsSection from "@/components/modules/home/NewsSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import MapEmbed from "@/components/shared/MapEmbed"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with MEDdical — location, phone, email, and a contact form.",
}

const ContactPage = () => {
  return (
    <>
      <InnerPageHero
        title="Our Contacts"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="/images/banners/contact.jpg"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <MapEmbed query="Dhaka, Bangladesh" />
      </div>

      <ContactFormSection />
      <NewsSection />
    </>
  )
}

export default ContactPage
