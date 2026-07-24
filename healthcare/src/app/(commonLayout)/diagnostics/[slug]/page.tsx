import ContactSection from "@/components/modules/home/ContactSection"
import OurDoctorsSection from "@/components/modules/home/OurDoctorsSection"
import ServicesSidebar from "@/components/modules/Services/ServicesSidebar"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { services } from "@/lib/servicesData"
import Image from "next/image"
import { notFound } from "next/navigation"

const bullets = [
  "A Passion for Healing",
  "5-Star Care",
  "All our best",
  "Believe in Us",
  "A Legacy of Excellence",
  "Always Caring",
]

interface SingleServicePageProps {
  params: Promise<{ slug: string }>
}

const SingleServicePage = async ({ params }: SingleServicePageProps) => {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <InnerPageHero
        title={service.title}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/diagnostics" }, { label: service.title }]}
        image="/images/banners/single-service.jpg"
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <ServicesSidebar activeSlug={service.slug} />

          <div className="relative h-72.5 w-full overflow-hidden rounded-[5px] sm:h-87.5">
            <Image
              src="/images/home/service-photo-1.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl space-y-5 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-primary">A passion for putting patients first.</h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-3">
                <span className="size-4 shrink-0 rounded-full bg-accent" />
                <p className="text-lg">{bullet}</p>
              </div>
            ))}
          </div>

          {service.description.map((paragraph) => (
            <p key={paragraph} className="max-w-3xl text-base leading-7 text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <OurDoctorsSection pageSize={3} fetchLimit={9} eyebrow="Meet the" title="Team Members" />
      <ContactSection />
    </>
  )
}

export default SingleServicePage
