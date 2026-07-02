"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CalendarCheck, HeartPulse, Menu, Stethoscope } from "lucide-react"
import Link from "next/link"

const navItems = [
  { label: "Consultation", href: "/consultation" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Health Plans", href: "/health-plans" },
  { label: "Medicine", href: "/medicine" },
  { label: "NGOs", href: "/ngos" },
]

const Brand = () => (
  <Link href="/" className="flex items-center gap-2">
    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <HeartPulse className="size-5" aria-hidden="true" />
    </span>
    <span className="text-lg font-semibold tracking-tight">HealthCare</span>
  </Link>
)

const PublicNavbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/consultation">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Book Appointment
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[min(88vw,22rem)]">
            <SheetHeader>
              <SheetTitle className="sr-only">HealthCare navigation</SheetTitle>
              <Brand />
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-2 px-6">
              {navItems.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="grid gap-2 p-6">
              <SheetClose asChild>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/consultation">
                    <Stethoscope className="size-4" aria-hidden="true" />
                    Find a Doctor
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default PublicNavbar
