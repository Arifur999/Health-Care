import { Button } from "@/components/ui/button"
import { HeartPulse, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { label: "Consultation", href: "/consultation" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Health Plans", href: "/health-plans" },
  { label: "Medicine", href: "/medicine" },
]

const PublicFooter = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HeartPulse className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight">HealthCare</span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            A connected healthcare platform for doctor discovery, appointment booking, prescriptions, diagnostics, and patient care support.
          </p>
          <Button asChild>
            <Link href="/consultation">Find a Doctor</Link>
          </Button>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h2>
          <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              +880 1700 000000
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              support@healthcare.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>

      <div className="border-t py-5">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright 2026 HealthCare. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/health-plans" className="hover:text-foreground">
              Plans
            </Link>
            <Link href="/ngos" className="hover:text-foreground">
              Community
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter
