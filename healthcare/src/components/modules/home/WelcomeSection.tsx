"use client"

import { useTranslation } from "@/lib/i18n/LanguageProvider"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const WelcomeSection = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-background pb-20 pt-8 sm:pt-12">
      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">{t("welcome.eyebrow")}</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">{t("welcome.title")}</h2>
        <p className="text-base leading-7 text-foreground/80">
          {t("welcome.body")}
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Image
          src="/images/home/welcome-doctors-group.jpg"
          alt="Meddical care team"
          width={992}
          height={250}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="aspect-992/250 w-full rounded-[5px] object-cover"
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
            {t("welcome.learnMore")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
