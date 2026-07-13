"use client"

import ScheduleHoursCard from "@/components/modules/Appointment/ScheduleHoursCard"
import { getAllSpecialties, getDoctors } from "@/services/doctor.services"
import { type IDoctor } from "@/types/doctor.types"
import { type ISpecialty } from "@/types/specialty.types"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const fieldClass =
  "w-full rounded-[5px] bg-primary px-4 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none"

const AppointmentFormSection = () => {
  const router = useRouter()
  const [doctorId, setDoctorId] = useState("")
  const [name, setName] = useState("")

  const { data: doctorsResponse } = useQuery({
    queryKey: ["appointment-page-doctors"],
    queryFn: () => getDoctors("limit=50&sortBy=name&sortOrder=asc"),
  })

  const { data: specialtiesResponse } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60 * 60 * 6,
  })

  const doctors: IDoctor[] = doctorsResponse?.data ?? []
  const specialties: ISpecialty[] = specialtiesResponse?.data ?? []

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter your name")
      return
    }

    if (doctorId) {
      toast.success("Choose an available schedule to complete your booking")
      router.push(`/consultation/doctor/${doctorId}`)
      return
    }

    toast.message("Browse our doctors to pick a schedule")
    router.push("/consultation")
  }

  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-6">
          <h2 className="font-display text-3xl text-primary sm:text-4xl">Book an Appointment</h2>
          <p className="max-w-lg text-base leading-7 text-foreground/80">
            Share a few details and we will take you straight to your chosen doctor&apos;s
            schedule. Full booking is confirmed once you select an available time slot.
          </p>

          <form onSubmit={handleSubmit} className="rounded-[5px] bg-secondary p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={fieldClass}
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <select className={fieldClass} defaultValue="">
                <option value="" disabled className="text-foreground">Gender</option>
                <option value="female" className="text-foreground">Female</option>
                <option value="male" className="text-foreground">Male</option>
                <option value="other" className="text-foreground">Other</option>
              </select>
              <input className={fieldClass} type="email" placeholder="Email" />
              <input className={fieldClass} type="tel" placeholder="Phone" />
              <input className={fieldClass} type="date" />
              <input className={fieldClass} type="time" />
              <select
                className={fieldClass}
                value={doctorId}
                onChange={(event) => setDoctorId(event.target.value)}
              >
                <option value="" className="text-foreground">Any Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={String(doctor.id)} className="text-foreground">
                    {doctor.name}
                  </option>
                ))}
              </select>
              <select className={fieldClass} defaultValue="">
                <option value="" className="text-foreground">Department</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.title} className="text-foreground">
                    {specialty.title}
                  </option>
                ))}
              </select>
              <textarea className={`${fieldClass} sm:col-span-2`} rows={3} placeholder="Message" />
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-[5px] bg-accent py-3.5 text-sm font-medium uppercase text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Submit
            </button>
          </form>
        </div>

        <ScheduleHoursCard />
      </div>
    </section>
  )
}

export default AppointmentFormSection
