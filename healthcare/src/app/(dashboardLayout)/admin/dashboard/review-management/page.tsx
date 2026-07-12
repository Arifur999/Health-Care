import ReviewsManagementList from "@/components/modules/Admin/ReviewManagement/ReviewsManagementList"
import { getAllReviews } from "@/services/review.services"

const ReviewManagementPage = async () => {
  const reviewsResponse = await getAllReviews().catch(() => null)
  const reviews = reviewsResponse?.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Review Management</h1>
        <p className="text-sm text-muted-foreground">
          Read-only view of patient reviews. The backend restricts review deletion to the
          reviewing patient (with an ownership check), so admins cannot delete reviews here.
        </p>
      </div>

      <ReviewsManagementList reviews={reviews} />
    </div>
  )
}

export default ReviewManagementPage
