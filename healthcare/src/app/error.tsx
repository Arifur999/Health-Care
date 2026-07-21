'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-10 size-137.5 rounded-full bg-destructive/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 size-137.5 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md space-y-6 text-center">
        <Link href="/" className="font-display text-3xl uppercase tracking-wide">
          <span className="text-primary">Med</span>
          <span className="text-accent">dical</span>
        </Link>

        <div className="space-y-2">
          <h1 className="font-display text-2xl text-primary">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred. You can try again, or head back home.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => unstable_retry()} size="lg" className="rounded-full bg-secondary px-9 text-primary hover:bg-secondary/90">
            Try again
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-9">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
