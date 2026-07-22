"use client"

import { useTranslation } from "@/lib/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

const LanguageToggle = ({ className }: { className?: string }) => {
  const { locale, setLocale } = useTranslation()

  return (
    <div className={cn("inline-flex items-center rounded-full border border-primary-foreground/30 p-0.5 text-xs", className)}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "cursor-pointer rounded-full px-2.5 py-1 font-medium transition-colors",
          locale === "en" ? "bg-secondary text-primary" : "text-primary-foreground hover:text-secondary",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("bn")}
        className={cn(
          "cursor-pointer rounded-full px-2.5 py-1 font-medium transition-colors",
          locale === "bn" ? "bg-secondary text-primary" : "text-primary-foreground hover:text-secondary",
        )}
        aria-pressed={locale === "bn"}
      >
        বাংলা
      </button>
    </div>
  )
}

export default LanguageToggle
