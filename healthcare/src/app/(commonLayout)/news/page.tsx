import NewsSidebar from "@/components/modules/News/NewsSidebar"
import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import { getNews } from "@/services/news.services"
import { type INews } from "@/types/news.types"
import { format } from "date-fns"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description: "Health news, tips, and updates from the MEDdical care team.",
}

const NewsPage = async () => {
  const response = await getNews().catch(() => null)
  const articles: INews[] = response?.data ?? []

  return (
    <>
      <InnerPageHero
        title="Blog Posts"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "News" }]}
        image="/images/banners/news.jpg"
      />

      <section className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
          <div className="space-y-10">
            {articles.length === 0 && (
              <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
                No articles have been published yet. Please check back soon.
              </p>
            )}
            {articles.map((article) => (
              <article key={article.slug} className="space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage || "/images/home/news-thumb.jpg"}
                  alt=""
                  className="h-72.5 w-full rounded-[5px] object-cover"
                />
                <div className="flex flex-wrap items-center gap-4 text-sm text-accent">
                  <span>{format(new Date(article.createdAt), "MMMM dd, yyyy")}</span>
                  <span>By {article.author}</span>
                </div>
                <Link href={`/news/${article.slug}`}>
                  <h2 className="font-display text-2xl text-primary hover:text-accent">{article.title}</h2>
                </Link>
                <p className="text-base leading-7 text-foreground/80">{article.excerpt}</p>
                <Button asChild className="rounded-full bg-secondary px-8 text-primary hover:bg-secondary/90">
                  <Link href={`/news/${article.slug}`}>Read More</Link>
                </Button>
              </article>
            ))}
          </div>

          <NewsSidebar />
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default NewsPage
