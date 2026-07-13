"use client"

import { HeartHandshake, MessageCircle } from "lucide-react"
import { useState } from "react"

const articles = [
  {
    title: "This Article's Title goes Here, but not too long.",
    author: "Monday 05, September 2021 | By Author",
    likes: 68,
    comments: 86,
  },
  {
    title: "Five habits that keep your heart healthy year-round.",
    author: "Wednesday 08, September 2021 | By Author",
    likes: 52,
    comments: 41,
  },
  {
    title: "What to expect during your first specialist visit.",
    author: "Monday 13, September 2021 | By Author",
    likes: 77,
    comments: 63,
  },
  {
    title: "Understanding your lab results, explained simply.",
    author: "Friday 17, September 2021 | By Author",
    likes: 34,
    comments: 29,
  },
]

const NewsSection = () => {
  const [page, setPage] = useState(0)
  const visible = articles.slice(page * 4, page * 4 + 4)
  const pageCount = Math.ceil(articles.length / 4)

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
          <article
            key={article.title}
            className="flex gap-4 rounded-[5px] bg-background p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/news-thumb.jpg"
              alt=""
              className="h-38.5 w-32 shrink-0 rounded-[5px] object-cover"
            />
            <div className="flex flex-col justify-center gap-2 py-2">
              <p className="text-xs text-accent">{article.author}</p>
              <p className="text-lg leading-6">{article.title}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="size-4" aria-hidden="true" />
                  {article.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {article.comments}
                </span>
              </div>
            </div>
          </article>
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
