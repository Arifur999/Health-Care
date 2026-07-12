import MyReviewsList from "@/components/modules/Doctor/Reviews/MyReviewsList"
import { getMyReviews } from "@/services/review.services"

const DoctorsMyReviewPage = async () => {
  const reviewsResponse = await getMyReviews().catch(() => null)
  const reviews = reviewsResponse?.data ?? []

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Reviews</h1>
        <p className="text-sm text-muted-foreground">Feedback your patients have left after appointments.</p>
      </div>
      <MyReviewsList reviews={reviews} />
    </div>
  )
}

export default DoctorsMyReviewPage
