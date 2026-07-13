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
import { cn } from "@/lib/utils"
import { Clock3, Mail, Menu, Phone, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Services", href: "/diagnostics" },
  { label: "Doctors", href: "/consultation" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
]

const Brand = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("font-display text-3xl uppercase tracking-wide", className)}>
    <span className="text-primary">Med</span>
    <span className="text-accent">dical</span>
  </Link>
)

const TopBar = () => {
  return (
    <div className="hidden border-b bg-background lg:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Brand />

        <div className="flex items-center gap-10 text-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-accent">+880 1700-000000</p>
              <p className="text-xs font-medium uppercase text-primary">Emergency</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
              <Clock3 className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-accent">09:00 - 20:00 Everyday</p>
              <p className="text-xs font-medium uppercase text-primary">Work Hour</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
              <Mail className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-accent">Dhaka, Bangladesh</p>
              <p className="text-xs font-medium uppercase text-primary">Location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PublicNavbar = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40">
      <TopBar />

      <div className="bg-primary">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:justify-center lg:gap-16 lg:px-8">
          <div className="lg:hidden">
            <Brand className="text-2xl" />
          </div>

          <nav className="hidden items-center gap-6 text-base lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-semibold transition-colors",
                    isActive ? "text-secondary" : "text-primary-foreground hover:text-secondary",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-12.5 lg:flex">
            <Search className="size-5 text-primary-foreground" aria-hidden="true" />
            <Button asChild className="rounded-full bg-secondary px-8 py-5 text-primary hover:bg-secondary/90">
              <Link href="/consultation">Appointment</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden">
                <Menu className="size-5" aria-hidden="true" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(88vw,22rem)]">
              <SheetHeader>
                <SheetTitle className="sr-only">MEDdical navigation</SheetTitle>
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
                  <Button className="rounded-full" asChild>
                    <Link href="/consultation">Appointment</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default PublicNavbar
