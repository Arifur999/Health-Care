import NewsSidebar from "@/components/modules/News/NewsSidebar"
import ContactSection from "@/components/modules/home/ContactSection"
import InnerPageHero from "@/components/shared/InnerPageHero"
import { Button } from "@/components/ui/button"
import { newsArticles } from "@/lib/newsData"
import { format } from "date-fns"
import { Eye, Heart } from "lucide-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface SingleNewsPageProps {
  params: Promise<{ slug: string }>
}

const SingleNewsPage = async ({ params }: SingleNewsPageProps) => {
  const { slug } = await params
  const index = newsArticles.findIndex((item) => item.slug === slug)

  if (index === -1) {
    notFound()
  }

  const article = newsArticles[index]
  const previous = newsArticles[index - 1]
  const next = newsArticles[index + 1]

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

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/doctor-card-1.jpg"
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
