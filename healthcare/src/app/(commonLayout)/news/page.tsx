import NewsSidebar from "@/components/modules/News/NewsSidebar"
import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import { newsArticles } from "@/lib/newsData"
import { format } from "date-fns"
import { Eye, Heart } from "lucide-react"
import Link from "next/link"

const NewsPage = () => {
  return (
    <>
      <InnerPageHero title="Blog Posts" breadcrumb={[{ label: "Home", href: "/" }, { label: "News" }]} />

      <section className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
          <div className="space-y-10">
            {newsArticles.map((article) => (
              <article key={article.slug} className="space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/news-thumb.jpg"
                  alt=""
                  className="h-72.5 w-full rounded-[5px] object-cover"
                />
                <div className="flex flex-wrap items-center gap-4 text-sm text-accent">
                  <span>{format(new Date(article.date), "MMMM dd, yyyy")}</span>
                  <span>By {article.author}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="size-4" aria-hidden="true" />
                    {article.views}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="size-4" aria-hidden="true" />
                    {article.likes}
                  </span>
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
