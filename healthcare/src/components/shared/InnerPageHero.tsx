import Link from "next/link"

interface InnerPageHeroProps {
  title: string
  breadcrumb: { label: string; href?: string }[]
  image?: string
}

const InnerPageHero = ({ title, breadcrumb, image = "/images/banners/about.jpg" }: InnerPageHeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="size-full object-cover object-bottom" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute -right-32 top-30.5 size-64 rounded-full bg-secondary/50" />
        <span className="absolute -left-30 -top-30 size-60 rounded-full bg-accent/30" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="text-base text-primary" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => (
            <span key={item.label}>
              {item.href ? (
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
              {index < breadcrumb.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">{title}</h1>
      </div>

      <div className="flex h-2 w-full">
        <span className="h-full w-3/5 bg-primary" />
        <span className="h-full w-1/5 bg-secondary" />
        <span className="h-full w-1/5 bg-accent" />
      </div>
    </section>
  )
}

export default InnerPageHero
