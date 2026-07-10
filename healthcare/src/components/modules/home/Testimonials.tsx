import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllReviews } from "@/services/review.services"
import { type IReview } from "@/types/review.types"
import { Quote, Star } from "lucide-react"

const getInitials = (name?: string) =>
  (name ?? "P")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const Testimonials = async () => {
  const reviewsResponse = await getAllReviews().catch(() => null)
  const reviews = (reviewsResponse?.data ?? [])
    .filter((review: IReview) => Boolean(review.comment?.trim()))
    .slice(0, 3)

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">Patient stories</span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What patients say after their visit.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review: IReview) => (
            <article key={review.id} className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
              <Quote className="size-6 text-primary/40" aria-hidden="true" />
              <div className="mt-3 flex items-center gap-1 text-amber-600">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${index < Math.round(review.rating) ? "fill-current" : "text-muted-foreground/30"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t pt-4">
                <Avatar className="size-10">
                  <AvatarImage src={review.patient?.profilePhoto} alt={review.patient?.name ?? "Patient"} />
                  <AvatarFallback>{getInitials(review.patient?.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{review.patient?.name ?? "Verified Patient"}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Reviewed {review.doctor?.name ?? "a specialist"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
