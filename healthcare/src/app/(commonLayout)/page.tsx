import Hero from "@/components/modules/home/Hero"
import PublicFooter from "@/components/modules/home/PublicFooter"
import PublicNavbar from "@/components/modules/home/PublicNavbar"
import Steps from "@/components/modules/home/Steps"
import TopDoctors from "@/components/modules/home/TopDoctors"

const CommonLayoutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <PublicNavbar />
      <Hero />
      <Steps />
      <TopDoctors />
      <PublicFooter />
    </main>
  )
}

export default CommonLayoutPage
