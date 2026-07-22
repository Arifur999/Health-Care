import NewsSidebar from "@/components/modules/News/NewsSidebar"
import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { getNews, getNewsBySlug } from "@/services/news.services"
import { type INews } from "@/types/news.types"
import { format } from "date-fns"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface SingleNewsPageProps {
  params: Promise<{ slug: string }>
}

const SingleNewsPage = async ({ params }: SingleNewsPageProps) => {
  const { slug } = await params

  const response = await getNewsBySlug(slug).catch(() => null)
  const article = response?.data
  if (!article) {
    notFound()
  }

  // Fetch the list to compute previous/next by publish order.
  const listResponse = await getNews().catch(() => null)
  const articles: INews[] = listResponse?.data ?? []
  const index = articles.findIndex((item) => item.slug === slug)
  const previous = index >= 0 ? articles[index - 1] : undefined
  const next = index >= 0 ? articles[index + 1] : undefined

  return (
    <>
      <InnerPageHero
        title={article.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.category },
        ]}
        image="/images/banners/single-news.jpg"
      />

      <section className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-accent">
              <span>{format(new Date(article.createdAt), "MMMM dd, yyyy")}</span>
              <span>By {article.author}</span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage || "/images/home/news-thumb.jpg"}
              alt=""
              className="h-87.5 w-full rounded-[5px] object-cover"
            />

            <div className="space-y-4">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-7 text-foreground/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              {previous ? (
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href={`/news/${previous.slug}`}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Previous Article
                  </Link>
                </Button>
              ) : (
                <span />
              )}
              {next ? (
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href={`/news/${next.slug}`}>
                    Next Article
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : (
                <span />
              )}
            </div>
          </div>

          <NewsSidebar />
        </div>
      </section>

      <ContactSection />
    </>
  )
}

export default SingleNewsPage
