"use client"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/LanguageProvider"
import { type TranslationKey } from "@/lib/i18n/translations"
import { Banknote, CalendarCheck, Users } from "lucide-react"
import Link from "next/link"

const highlights: { titleKey: TranslationKey; icon: typeof CalendarCheck; className: string }[] = [
  {
    titleKey: "hero.bookAppointment",
    icon: CalendarCheck,
    className: "bg-primary text-primary-foreground",
  },
  {
    titleKey: "hero.expertDoctors",
    icon: Users,
    className: "bg-secondary text-primary",
  },
  {
    titleKey: "hero.affordableCare",
    icon: Banknote,
    className: "bg-accent text-accent-foreground",
  },
]

const Hero = () => {
  const { t } = useTranslation()
  const titleLines = t("hero.title").split("\n")
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/hero-doctor.jpg"
          alt="Doctor caring for a patient"
          className="size-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background from-35% via-background/70 via-55% to-transparent" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 bottom-0 size-137.5 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -left-40 -top-24 size-137.5 rounded-full bg-secondary/30 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto flex min-h-125 w-full max-w-7xl flex-col justify-center gap-6 px-4 py-14 sm:px-6 lg:min-h-137.5 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">{t("hero.tagline")}</p>
        <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl">
          {titleLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <Button size="lg" asChild className="w-fit rounded-full bg-secondary px-9 py-6 text-base text-primary hover:bg-secondary/90">
          <Link href="/diagnostics">{t("hero.cta")}</Link>
        </Button>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.titleKey}
                className={`flex items-center justify-center gap-4 rounded-[5px] px-6 py-6 shadow-lg ${item.className}`}
              >
                <p className="text-base font-medium">{t(item.titleKey)}</p>
                <Icon className="size-9" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-16 sm:h-20" aria-hidden="true" />
    </section>
  )
}

export default Hero
