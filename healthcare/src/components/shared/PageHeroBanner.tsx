import { type ReactNode } from "react"

const PageHeroBanner = ({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) => {
  return (
    <section className="border-b bg-linear-to-br from-background via-blue-50/70 to-cyan-50/80">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="text-base leading-7 text-muted-foreground">{description}</p>
          {action}
        </div>
      </div>
    </section>
  )
}

export default PageHeroBanner
