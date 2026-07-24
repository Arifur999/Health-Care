"use client"

import { useTranslation } from "@/lib/i18n/LanguageProvider"
import { type TranslationKey } from "@/lib/i18n/translations"
import { Button } from "@/components/ui/button"
import { Activity, Droplet, HeartPulse, Stethoscope } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const sideItems: { labelKey: TranslationKey; icon: typeof Stethoscope; active: boolean }[] = [
  { labelKey: "services.freeCheckup", icon: Stethoscope, active: false },
  { labelKey: "services.cardiogram", icon: HeartPulse, active: true },
  { labelKey: "services.dnaTesting", icon: Activity, active: false },
  { labelKey: "services.bloodBank", icon: Droplet, active: false },
]

const bulletKeys: TranslationKey[] = [
  "services.bullet1",
  "services.bullet2",
  "services.bullet3",
  "services.bullet4",
  "services.bullet5",
  "services.bullet6",
]

const photos = ["/images/home/service-photo-1.jpg", "/images/home/service-photo-2.jpg"]

const OurServicesSection = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-secondary/5 py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">{t("services.eyebrow")}</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">{t("services.title")}</h2>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
        <div className="flex shrink-0 flex-col overflow-hidden rounded-[5px] border border-primary/20 lg:w-40">
          {sideItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.labelKey}
                className={`flex flex-1 flex-col items-center justify-center gap-3 px-4 py-7 ${
                  item.active ? "bg-secondary text-primary" : "text-foreground"
                }`}
              >
                <Icon className="size-8" aria-hidden="true" />
                <p className="text-base">{t(item.labelKey)}</p>
              </div>
            )
          })}
          <Button className="w-full rounded-none bg-primary py-5 text-secondary hover:bg-primary/90" asChild>
            <Link href="/diagnostics">{t("services.viewAll")}</Link>
          </Button>
        </div>

        <div className="flex-1 space-y-6">
          <h3 className="text-2xl font-medium">{t("services.subtitle")}</h3>

          <div className="grid gap-3 sm:grid-cols-2">
            {bulletKeys.map((bulletKey) => (
              <div key={bulletKey} className="flex items-center gap-3">
                <span className="size-4 shrink-0 rounded-full bg-accent" />
                <p className="text-lg">{t(bulletKey)}</p>
              </div>
            ))}
          </div>

          <p className="max-w-lg text-base leading-7 text-foreground/80">{t("services.body1")}</p>
          <p className="max-w-lg text-base leading-7 text-foreground/80">{t("services.body2")}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-6 sm:flex-row lg:w-80 lg:flex-col">
          {photos.map((src, index) => (
            <div key={src} className="space-y-3">
              <div className="relative h-44 w-full overflow-hidden rounded-[5px]">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="flex h-2 overflow-hidden rounded-full">
                <span className={`h-full ${index === 0 ? "w-3/4" : "w-1/2"} bg-primary`} />
                <span className="h-full w-1/5 bg-accent" />
                <span className="h-full flex-1 bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurServicesSection
