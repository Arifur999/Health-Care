"use client"

import { newsArticles } from "@/lib/newsData"
import { format } from "date-fns"
import { HeartHandshake, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const NewsSection = () => {
  const [page, setPage] = useState(0)
  const visible = newsArticles.slice(page * 4, page * 4 + 4)
  const pageCount = Math.ceil(newsArticles.length / 4)

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">
          Better information, Better health
        </p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">News</h2>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
        {visible.map((article) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="flex gap-4 rounded-[5px] bg-background p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/news-thumb.jpg"
              alt=""
              className="h-38.5 w-32 shrink-0 rounded-[5px] object-cover"
            />
            <div className="flex flex-col justify-center gap-2 py-2">
              <p className="text-xs text-accent">
                {format(new Date(article.date), "MMMM dd, yyyy")} | By {article.author}
              </p>
              <p className="text-lg leading-6">{article.title}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="size-4" aria-hidden="true" />
                  {article.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {article.views}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show news page ${index + 1}`}
              onClick={() => setPage(index)}
              className={`size-2.5 rounded-full transition-colors ${
                index === page ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default NewsSection
