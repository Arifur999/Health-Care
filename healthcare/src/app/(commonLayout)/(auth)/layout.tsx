import Image from "next/image"
import type { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 top-10 size-137.5 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 size-137.5 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="relative isolate hidden overflow-hidden rounded-[5px] lg:block lg:min-h-137.5">
          <Image
            src="/images/home/service-photo-1.jpg"
            alt="A doctor caring for a patient"
            fill
            sizes="(max-width: 1024px) 0px, 50vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-primary/80" />

          <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-10 text-primary-foreground">
            <p className="text-lg font-bold uppercase tracking-[2.88px] text-secondary">Caring for Life</p>
            <h2 className="font-display text-4xl leading-tight">Your care, connected in one place.</h2>
            <p className="text-base text-primary-foreground/80">
              Book appointments, message your care team, and keep every prescription and health
              record together in one secure account.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">{children}</div>
      </div>
    </section>
  )
}

export default AuthLayout
