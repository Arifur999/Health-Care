import { FacebookIcon, InstagramIcon, TwitterIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { label: "Appointment", href: "/appointment" },
  { label: "Doctors", href: "/consultation" },
  { label: "Services", href: "/diagnostics" },
  { label: "About Us", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
]

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Twitter", href: "#", icon: TwitterIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
]

const PublicFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="font-display text-3xl uppercase tracking-wide text-secondary">
            Meddical
          </Link>
          <p className="max-w-xs text-base leading-6">
            Leading the Way in Medical Excellence, Trusted Care.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Important Links</h2>
          <nav className="grid gap-3" aria-label="Footer navigation">
            {quickLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-base transition-colors hover:text-secondary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <div className="grid gap-3 text-base">
            <p>
              Call:{" "}
              <a href="tel:+8801700000000" className="transition-colors hover:text-secondary">
                +880 1700-000000
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:support@meddical.com" className="transition-colors hover:text-secondary">
                support@meddical.com
              </a>
            </p>
            <p>Address: Meddical Hospital Campus</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <div className="flex items-center gap-2 rounded-[5px] bg-secondary p-1.5">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent px-3 py-2 text-sm text-primary placeholder:text-primary/70 focus:outline-none"
            />
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-[5px] bg-primary text-primary-foreground"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>© {new Date().getFullYear()} MEDdical. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="transition-colors hover:text-secondary">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="transition-colors hover:text-secondary">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-primary"
              >
                <HugeiconsIcon icon={social.icon} size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter
