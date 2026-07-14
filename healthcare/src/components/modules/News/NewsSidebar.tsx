import { newsArticles, newsCategories } from "@/lib/newsData"
import { format } from "date-fns"
import { Search } from "lucide-react"
import Link from "next/link"

const NewsSidebar = () => {
  return (
    <aside className="space-y-8">
      <form className="flex items-center gap-2 rounded-[5px] bg-primary p-2">
        <input
          placeholder="Search"
          className="w-full bg-transparent px-2 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[5px] bg-secondary text-primary"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
      </form>

      <div>
        <h3 className="font-display text-xl text-primary">Recent Posts</h3>
        <div className="mt-4 space-y-4">
          {newsArticles.slice(0, 6).map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="flex gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/news-thumb.jpg"
                alt=""
                className="size-14 shrink-0 rounded-[5px] object-cover"
              />
              <div className="space-y-1">
                <p className="text-xs text-accent">{format(new Date(article.date), "MMMM dd, yyyy")}</p>
                <p className="text-sm leading-5 group-hover:text-primary">{article.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-primary">Categories</h3>
        <div className="mt-4 space-y-3">
          {newsCategories.map((category) => (
            <div key={category.label} className="flex items-center justify-between text-base">
              <span>{category.label}</span>
              <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default NewsSidebar
