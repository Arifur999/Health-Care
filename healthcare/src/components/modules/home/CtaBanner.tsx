import { Button } from "@/components/ui/button"
import { CalendarCheck, Search } from "lucide-react"
import Link from "next/link"

const CtaBanner = () => {
  return (
    <section className="bg-background pb-16 sm:pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to take the next step in your care?
              </h2>
              <p className="text-primary-foreground/85">
                Create your account, find the right specialist, and book an appointment in minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/consultation">
                  <Search className="size-4" aria-hidden="true" />
                  Find Doctors
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/register">
                  <CalendarCheck className="size-4" aria-hidden="true" />
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaBanner
