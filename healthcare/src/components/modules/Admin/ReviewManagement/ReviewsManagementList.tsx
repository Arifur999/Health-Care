import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type IReview } from "@/types/review.types"
import { format } from "date-fns"
import { Star } from "lucide-react"

const getInitials = (name?: string) =>
  (name ?? "U")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const formatDate = (value?: string) => {
  if (!value) {
    return "N/A"
  }

  const dateValue = new Date(value)
  return Number.isNaN(dateValue.getTime()) ? "N/A" : format(dateValue, "MMM dd, yyyy")
}

const ReviewsManagementList = ({ reviews }: { reviews: IReview[] }) => {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No reviews yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Reviews left by patients after completed appointments will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-600">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${index < Math.round(review.rating) ? "fill-current" : "text-muted-foreground/30"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
            </div>

            <p className="text-sm text-muted-foreground">{review.comment}</p>

            <div className="grid gap-3 border-t pt-3 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={review.patient?.profilePhoto} alt={review.patient?.name ?? "Patient"} />
                  <AvatarFallback>{getInitials(review.patient?.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">Patient</p>
                  <p className="text-sm font-medium">{review.patient?.name ?? "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={review.doctor?.profilePhoto} alt={review.doctor?.name ?? "Doctor"} />
                  <AvatarFallback>{getInitials(review.doctor?.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-muted-foreground">Doctor</p>
                  <p className="text-sm font-medium">{review.doctor?.name ?? "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ReviewsManagementList
