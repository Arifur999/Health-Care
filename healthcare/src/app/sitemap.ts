import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/diagnostics", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/consultation", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/appointment", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/health-plans", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/insurance", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/medicine", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/ngos", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/login", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/register", priority: 0.4, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
