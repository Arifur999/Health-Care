import Link from "next/link"

export const metadata = {
  title: "Offline",
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4">
        <Link href="/" className="font-display text-3xl uppercase tracking-wide">
          <span className="text-primary">Med</span>
          <span className="text-accent">dical</span>
        </Link>
        <h1 className="font-display text-2xl text-primary">You&apos;re offline</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          It looks like you&apos;ve lost your connection. Check your internet and try again — your
          appointments and prescriptions will be here when you&apos;re back online.
        </p>
      </div>
    </div>
  )
}
