import { getIconComponent } from "@/lib/iconMapper"
import { services } from "@/lib/servicesData"
import { cn } from "@/lib/utils"
import Link from "next/link"

const ServicesSidebar = ({ activeSlug }: { activeSlug: string }) => {
  return (
    <div className="overflow-hidden rounded-[5px] border border-primary/10">
      {services.map((service) => {
        const Icon = getIconComponent(service.icon)
        const isActive = service.slug === activeSlug
        return (
          <Link
            key={service.slug}
            href={`/diagnostics/${service.slug}`}
            className={cn(
              "flex items-center gap-3 border-b border-primary/10 px-5 py-4 text-sm last:border-b-0 transition-colors",
              isActive ? "bg-primary text-secondary" : "text-foreground hover:bg-secondary/20",
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            {service.title}
          </Link>
        )
      })}
    </div>
  )
}

export default ServicesSidebar
