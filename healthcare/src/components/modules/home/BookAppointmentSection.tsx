"use client"

import { useTranslation } from "@/lib/i18n/LanguageProvider"
import { getAllSpecialties, getDoctors } from "@/services/doctor.services"
import { type IDoctor } from "@/types/doctor.types"
import { type ISpecialty } from "@/types/specialty.types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const fieldClass =
  "w-full rounded-[5px] bg-primary px-4 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none"

const BookAppointmentSection = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [doctorId, setDoctorId] = useState("")
  const [name, setName] = useState("")

  const { data: doctorsResponse } = useQuery({
    queryKey: ["home-appointment-doctors"],
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
    <section className="relative isolate overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/home/appointment-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          <h2 className="font-display text-3xl text-accent sm:text-4xl">{t("book.title")}</h2>
          <p className="max-w-md text-base leading-7 text-foreground/80">{t("book.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[5px] bg-secondary p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={fieldClass}
              placeholder={t("book.name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input className={fieldClass} type="email" placeholder={t("book.email")} />
            <input className={fieldClass} type="tel" placeholder={t("book.phone")} />
            <select className={fieldClass} defaultValue="">
              <option value="" disabled className="text-foreground">
                {t("book.gender")}
              </option>
              <option value="female" className="text-foreground">{t("book.female")}</option>
              <option value="male" className="text-foreground">{t("book.male")}</option>
              <option value="other" className="text-foreground">{t("book.other")}</option>
            </select>
            <input className={fieldClass} type="date" />
            <input className={fieldClass} type="time" />
            <select
              className={fieldClass}
              value={doctorId}
              onChange={(event) => setDoctorId(event.target.value)}
            >
              <option value="" className="text-foreground">{t("book.anyDoctor")}</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={String(doctor.id)} className="text-foreground">
                  {doctor.name}
                </option>
              ))}
            </select>
            <select className={fieldClass} defaultValue="">
              <option value="" className="text-foreground">{t("book.department")}</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.title} className="text-foreground">
                  {specialty.title}
                </option>
              ))}
            </select>
            <textarea className={`${fieldClass} sm:col-span-2`} rows={3} placeholder={t("book.message")} />
          </div>

          <button
            type="submit"
            className="mt-3 w-full cursor-pointer rounded-[5px] bg-accent py-3.5 text-sm font-medium uppercase text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t("book.submit")}
          </button>
        </form>
      </div>
    </section>
  )
}

export default BookAppointmentSection
