"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getDefaultDashboardRoute } from "@/lib/authUtils"
import { cn } from "@/lib/utils"
import GlobalSearch from "@/components/shared/GlobalSearch"
import ThemeToggle from "@/components/shared/ThemeToggle"
import { logoutAction } from "@/services/auth.services"
import { type UserInfo } from "@/types/user.types"
import { Clock3, Key, LayoutDashboard, LogOut, Mail, Menu, Phone, Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Services", href: "/diagnostics" },
  { label: "Doctors", href: "/consultation" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
]

const EMERGENCY_PHONE = "+880 1700-000000"

interface PublicNavbarProps {
  currentUser?: UserInfo | null
}

const Brand = ({ className, inverted = false }: { className?: string; inverted?: boolean }) => (
  <Link href="/" className={cn("font-display text-3xl uppercase tracking-wide", className)}>
    <span className={inverted ? "text-primary-foreground" : "text-primary"}>Med</span>
    <span className="text-accent">dical</span>
  </Link>
)

const TopBar = () => {
  return (
    <div className="hidden border-b bg-background lg:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Brand />

        <div className="flex items-center gap-10 text-sm">
          <a href={`tel:${EMERGENCY_PHONE.replace(/\s/g, "")}`} className="group flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-accent">{EMERGENCY_PHONE}</p>
              <p className="text-xs font-medium uppercase text-primary">Emergency</p>
            </div>
          </a>

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

const AccountMenu = ({ currentUser }: { currentUser: UserInfo }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logoutAction()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <span className="text-sm font-semibold">{currentUser.name.charAt(0).toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            <p className="text-xs capitalize text-primary">{currentUser.role.toLowerCase().replace("_", " ")}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={getDefaultDashboardRoute(currentUser.role)}>
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/my-profile">
            <User className="mr-2 size-4" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/change-password">
            <Key className="mr-2 size-4" />
            Change Password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 size-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const PublicNavbar = ({ currentUser }: PublicNavbarProps) => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40">
      <TopBar />

      <div className="bg-primary">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:justify-center lg:gap-16 lg:px-8">
          <div className="lg:hidden">
            <Brand className="text-2xl" inverted />
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

          <div className="hidden items-center gap-8 lg:flex">
            <GlobalSearch
              trigger={
                <button type="button" className="cursor-pointer text-primary-foreground hover:text-secondary">
                  <Search className="size-5" aria-hidden="true" />
                  <span className="sr-only">Search</span>
                </button>
              }
            />
            <ThemeToggle className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
            <Button asChild className="rounded-full bg-secondary px-8 py-5 text-primary hover:bg-secondary/90">
              <Link href="/appointment">Appointment</Link>
            </Button>
            {currentUser ? (
              <AccountMenu currentUser={currentUser} />
            ) : (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
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
              <div className="px-6 pb-2">
                <a
                  href={`tel:${EMERGENCY_PHONE.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 rounded-lg bg-accent/10 px-3 py-2.5 text-accent transition-colors hover:bg-accent/20"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase text-primary">Emergency</span>
                    <span className="block text-sm font-semibold">{EMERGENCY_PHONE}</span>
                  </span>
                </a>
              </div>
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
                {currentUser && (
                  <SheetClose asChild>
                    <Link
                      href={getDefaultDashboardRoute(currentUser.role)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                  </SheetClose>
                )}
              </div>
              <div className="grid gap-2 p-6">
                {currentUser ? (
                  <form action={logoutAction}>
                    <Button variant="outline" type="submit" className="w-full">
                      <LogOut className="size-4" aria-hidden="true" />
                      Logout
                    </Button>
                  </form>
                ) : (
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Button className="rounded-full" asChild>
                    <Link href="/appointment">Appointment</Link>
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
