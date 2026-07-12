import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type IReview } from "@/types/review.types";
import { format } from "date-fns";
import { Star } from "lucide-react";

const getInitials = (name?: string) =>
  (name ?? "P")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy");
};

const MyReviewsList = ({ reviews }: { reviews: IReview[] }) => {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No reviews yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Reviews from your patients will appear here after they rate a completed appointment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center gap-1 text-amber-600">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${index < Math.round(review.rating) ? "fill-current" : "text-muted-foreground/30"}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
            <div className="flex items-center gap-3 border-t pt-3">
              <Avatar className="size-8">
                <AvatarImage src={review.patient?.profilePhoto} alt={review.patient?.name ?? "Patient"} />
                <AvatarFallback>{getInitials(review.patient?.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{review.patient?.name ?? "Patient"}</p>
                <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyReviewsList;
