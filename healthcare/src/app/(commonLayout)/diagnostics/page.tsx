import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { getIconComponent } from "@/lib/iconMapper"
import { services } from "@/lib/servicesData"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Diagnostic and clinical services offered at MEDdical.",
}

const photos = [
  "/images/home/service-photo-1.jpg",
  "/images/home/service-photo-2.jpg",
  "/images/home/doctor-card-1.jpg",
  "/images/home/doctor-card-3.jpg",
  "/images/home/hero-doctor.jpg",
  "/images/home/news-thumb.jpg",
]

const DiagnosticsPage = () => {
  return (
    <>
      <InnerPageHero
        title="Our Services"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="/images/banners/services.jpg"
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {services.map((service, index) => {
            const Icon = getIconComponent(service.icon)
            return (
              <article key={service.slug} className="space-y-4">
                <div className="relative">
                  <div className="relative h-52 w-full overflow-hidden rounded-[5px]">
                    <Image
                      src={photos[index % photos.length]}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-5 right-5 flex size-11 items-center justify-center rounded-full bg-primary text-secondary shadow-md">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-display text-xl text-primary">{service.title}</h3>
                <p className="text-sm leading-6 text-foreground/80">{service.excerpt}</p>
                <Link
                  href={`/diagnostics/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  Learn More
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default DiagnosticsPage
