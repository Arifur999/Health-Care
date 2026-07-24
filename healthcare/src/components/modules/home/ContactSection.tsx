"use client"

import { useTranslation } from "@/lib/i18n/LanguageProvider"
import { type TranslationKey } from "@/lib/i18n/translations"
import { Clock3, Mail, MapPin, Phone } from "lucide-react"

type ContactCard = {
  labelKey: TranslationKey
  icon: typeof Phone
  className: string
  // Literal lines (phone / email) stay the same in every language.
  lines?: string[]
  // Translatable lines (address, hours).
  lineKeys?: TranslationKey[]
}

const cards: ContactCard[] = [
  {
    labelKey: "contact.emergency",
    lines: ["+880 1700-000000", "+880 1800-000000"],
    icon: Phone,
    className: "bg-secondary text-primary",
  },
  {
    labelKey: "contact.location",
    lineKeys: ["contact.locationLine1", "contact.locationLine2"],
    icon: MapPin,
    className: "bg-primary text-secondary",
  },
  {
    labelKey: "contact.email",
    lines: ["support@meddical.com", "care@meddical.com"],
    icon: Mail,
    className: "bg-secondary text-primary",
  },
  {
    labelKey: "contact.workingHours",
    lineKeys: ["contact.hoursLine1", "contact.hoursLine2"],
    icon: Clock3,
    className: "bg-secondary text-primary",
  },
]

const ContactSection = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">{t("contact.eyebrow")}</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">{t("contact.title")}</h2>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {cards.map((card) => {
          const Icon = card.icon
          const lines = card.lineKeys ? card.lineKeys.map((key) => t(key)) : card.lines ?? []
          return (
            <div key={card.labelKey} className={`rounded-[5px] px-6 py-8 ${card.className}`}>
              <Icon className="size-9" aria-hidden="true" />
              <p className="mt-5 text-lg font-bold uppercase tracking-[2.88px]">{t(card.labelKey)}</p>
              <div className="mt-3 space-y-1 text-base">
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ContactSection
