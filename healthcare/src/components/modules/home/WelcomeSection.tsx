import { ArrowRight } from "lucide-react"
import Link from "next/link"

const WelcomeSection = () => {
  return (
    <section className="bg-background pb-20 pt-8 sm:pt-12">
      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Welcome to Meddical</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">A Great Place to Receive Care</h2>
        <p className="text-base leading-7 text-foreground/80">
          Meddical connects you with qualified specialists, digital prescriptions, and diagnostic
          services so your care team stays coordinated from the very first visit.
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/doctor-card-1.jpg"
          alt="Meddical care team"
          className="h-52 w-full rounded-[5px] object-cover sm:h-62.5"
        />

        <div className="mt-6 flex items-center justify-between gap-6">
          <div className="flex h-2 w-full overflow-hidden rounded-full">
            <span className="h-full w-3/5 bg-primary" />
            <span className="h-full w-1/5 bg-secondary" />
            <span className="h-full w-1/5 bg-accent" />
          </div>

          <Link
            href="/about-us"
            className="flex shrink-0 items-center gap-2 text-base text-accent hover:underline"
          >
            Learn More
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
