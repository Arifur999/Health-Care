"use client"

import { getAllReviews } from "@/services/review.services"
import { type IReview } from "@/types/review.types"
import { useQuery } from "@tanstack/react-query"
import { Quote } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const TestimonialBanner = () => {
  const [index, setIndex] = useState(0)

  const { data: reviewsResponse } = useQuery({
    queryKey: ["testimonial-reviews"],
    queryFn: getAllReviews,
  })

  const reviews: IReview[] = (reviewsResponse?.data ?? []).filter((review) => Boolean(review.comment?.trim()))

  if (reviews.length === 0) {
    return null
  }

  const current = reviews[index % reviews.length]

  return (
    <section className="relative isolate overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/home/appointment-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 text-center text-primary-foreground sm:px-6 lg:px-8">
        <Quote className="mx-auto size-10 text-secondary" aria-hidden="true" />
        <p className="text-lg leading-8">&ldquo;{current.comment}&rdquo;</p>
        <p className="border-t border-primary-foreground/20 pt-4 text-base font-medium">
          {current.patient?.name ?? "Verified Patient"}
        </p>

        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 pt-2">
            {reviews.slice(0, 5).map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Show testimonial ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`size-2.5 cursor-pointer rounded-full transition-colors ${
                  dotIndex === index % reviews.length ? "bg-secondary" : "bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialBanner
