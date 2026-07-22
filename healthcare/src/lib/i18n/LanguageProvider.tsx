"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { translations, type Locale, type TranslationKey } from "./translations"

const STORAGE_KEY = "meddical-locale"

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored === "en" || stored === "bn") {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const t = (key: TranslationKey) => translations[locale][key] ?? translations.en[key] ?? key

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
}

export const useTranslation = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    // Safe fallback so components using the hook outside the provider still render (English).
    return {
      locale: "en" as Locale,
      setLocale: () => undefined,
      t: (key: TranslationKey) => translations.en[key] ?? key,
    }
  }
  return context
}
