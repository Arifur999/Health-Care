import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-10 size-137.5 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 size-137.5 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md space-y-6 text-center">
        <Link href="/" className="font-display text-3xl uppercase tracking-wide">
          <span className="text-primary">Med</span>
          <span className="text-accent">dical</span>
        </Link>

        <p className="font-display text-8xl text-primary">404</p>

        <div className="space-y-2">
          <h1 className="font-display text-2xl text-primary">Page not found</h1>
          <p className="text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <Button asChild size="lg" className="rounded-full bg-secondary px-9 text-primary hover:bg-secondary/90">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
