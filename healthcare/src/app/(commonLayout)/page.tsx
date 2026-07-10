import CtaBanner from "@/components/modules/home/CtaBanner"
import Hero from "@/components/modules/home/Hero"
import OurServices from "@/components/modules/home/OurServices"
import PublicFooter from "@/components/modules/home/PublicFooter"
import PublicNavbar from "@/components/modules/home/PublicNavbar"
import Steps from "@/components/modules/home/Steps"
import Testimonials from "@/components/modules/home/Testimonials"
import TopDoctors from "@/components/modules/home/TopDoctors"
import WhyChooseUs from "@/components/modules/home/WhyChooseUs"

const CommonLayoutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <PublicNavbar />
      <Hero />
      <OurServices />
      <Steps />
      <TopDoctors />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
      <PublicFooter />
    </main>
  )
}

export default CommonLayoutPage
