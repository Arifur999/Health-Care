"use client"

import { FacebookIcon, InstagramIcon, TwitterIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { getDoctors } from "@/services/doctor.services"
import { type IDoctor } from "@/types/doctor.types"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

const PAGE_SIZE = 3

const OurDoctorsSection = () => {
  const [page, setPage] = useState(0)

  const { data: doctorsResponse } = useQuery({
    queryKey: ["home-our-doctors"],
    queryFn: () => getDoctors("sortBy=averageRating&sortOrder=desc&limit=9"),
  })

  const doctors: IDoctor[] = doctorsResponse?.data ?? []
  const pageCount = Math.max(1, Math.ceil(doctors.length / PAGE_SIZE))
  const visibleDoctors = doctors.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  if (doctors.length === 0) {
    return null
  }

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Trusted Care</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">Our Doctors</h2>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {visibleDoctors.map((doctor) => {
          const specialty = doctor.specialties?.[0]?.specialty.title ?? doctor.designation ?? "Specialist"
          return (
            <div key={String(doctor.id)} className="overflow-hidden rounded-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doctor.profilePhoto || "/images/home/doctor-card-3.jpg"}
                alt={doctor.name}
                className="h-87.5 w-full object-cover"
              />
              <div className="space-y-3 bg-secondary px-6 py-6 text-center">
                <p className="text-lg text-primary">{doctor.name}</p>
                <p className="text-lg font-bold uppercase tracking-[2.88px] text-primary">{specialty}</p>
                <div className="flex justify-center gap-4 pt-1 text-primary">
                  <HugeiconsIcon icon={FacebookIcon} size={20} />
                  <HugeiconsIcon icon={TwitterIcon} size={20} />
                  <HugeiconsIcon icon={InstagramIcon} size={20} />
                </div>
              </div>
              <Link
                href={`/consultation/doctor/${doctor.id}`}
                className="block bg-primary py-3 text-center text-base text-secondary transition-colors hover:bg-primary/90"
              >
                View Profile
              </Link>
            </div>
          )
        })}
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show doctors page ${index + 1}`}
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

export default OurDoctorsSection
