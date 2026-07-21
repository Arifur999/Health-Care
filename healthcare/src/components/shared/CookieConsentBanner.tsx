"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

const STORAGE_KEY = "meddical-cookie-consent"

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted")
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-xl border bg-card p-4 shadow-lg">
      <p className="text-sm text-muted-foreground">
        We use cookies to keep you signed in and to understand how the site is used. See our{" "}
        <Link href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-accent">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <Button onClick={accept} className="mt-3 w-full rounded-full bg-secondary px-6 text-primary hover:bg-secondary/90 sm:w-auto">
        Got it
      </Button>
    </div>
  )
}

export default CookieConsentBanner
