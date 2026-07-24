"use client"

import { submitDoctorApplicationAction } from "@/app/(commonLayout)/careers/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { DoctorApplicationZodSchema } from "@/zod/doctorApplication.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { z } from "zod"

// The form keeps numeric inputs as strings, so validate the string here and
// let the server action coerce/validate the final number.
const experienceFieldValidator = z
  .string()
  .refine((value) => value.trim() !== "" && Number.isInteger(Number(value)) && Number(value) >= 0, {
    message: "Experience must be a whole number (0 or more)",
  })
const feeFieldValidator = z
  .string()
  .refine((value) => value.trim() !== "" && !Number.isNaN(Number(value)) && Number(value) >= 0, {
    message: "Enter a valid fee (0 or more)",
  })

const DoctorApplicationForm = () => {
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitDoctorApplicationAction,
  })

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      registrationNumber: "",
      experience: "0",
      gender: "" as "" | "MALE" | "FEMALE" | "OTHER",
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      appointmentFee: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const result = await mutateAsync({
        name: value.name,
        email: value.email,
        contactNumber: value.contactNumber,
        registrationNumber: value.registrationNumber,
        experience: Number(value.experience),
        gender: value.gender as "MALE" | "FEMALE" | "OTHER",
        qualification: value.qualification,
        currentWorkingPlace: value.currentWorkingPlace,
        designation: value.designation,
        appointmentFee: Number(value.appointmentFee),
        message: value.message || undefined,
      })

      if (!result.success) {
        setServerError(result.message || "Failed to submit application")
        return
      }

      setSubmitted(true)
    },
  })

  if (submitted) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <CheckCircle2 className="size-12 text-[#159eec]" aria-hidden="true" />
          <h2 className="font-display text-2xl text-primary">Application received</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Thank you for applying to join MEDdical. Our team will review your details and email you
            about the next steps. If approved, you&apos;ll receive login credentials at the email you
            provided.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-display text-2xl text-primary">Doctor Application</CardTitle>
        <CardDescription>
          Tell us about yourself. All fields are required unless noted. Our team verifies every
          application before approval.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="name" validators={{ onChange: DoctorApplicationZodSchema.shape.name }}>
              {(field) => (
                <AppField field={field} label="Full Name" placeholder="Dr. Jane Doe" />
              )}
            </form.Field>

            <form.Field name="email" validators={{ onChange: DoctorApplicationZodSchema.shape.email }}>
              {(field) => (
                <AppField field={field} label="Email" type="email" placeholder="you@example.com" />
              )}
            </form.Field>

            <form.Field
              name="contactNumber"
              validators={{ onChange: DoctorApplicationZodSchema.shape.contactNumber }}
            >
              {(field) => (
                <AppField field={field} label="Contact Number" placeholder="01XXXXXXXXX" />
              )}
            </form.Field>

            <form.Field
              name="registrationNumber"
              validators={{ onChange: DoctorApplicationZodSchema.shape.registrationNumber }}
            >
              {(field) => (
                <AppField field={field} label="BMDC Registration No." placeholder="BMDC-XXXXX" />
              )}
            </form.Field>

            <form.Field name="gender">
              {(field) => {
                const isTouched = field.state.meta.isTouched
                const hasError = isTouched && field.state.meta.errors.length > 0
                return (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name} className={hasError ? "text-destructive" : undefined}>
                      Gender
                    </Label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value as typeof field.state.value)}
                      aria-invalid={hasError}
                      className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive"
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                    {hasError && (
                      <p role="alert" className="text-sm text-destructive">
                        Please select a gender
                      </p>
                    )}
                  </div>
                )
              }}
            </form.Field>

            <form.Field name="experience" validators={{ onChange: experienceFieldValidator }}>
              {(field) => (
                <AppField field={field} label="Years of Experience" type="number" placeholder="5" />
              )}
            </form.Field>

            <form.Field
              name="qualification"
              validators={{ onChange: DoctorApplicationZodSchema.shape.qualification }}
            >
              {(field) => (
                <AppField field={field} label="Qualification" placeholder="MBBS, FCPS (Medicine)" />
              )}
            </form.Field>

            <form.Field
              name="designation"
              validators={{ onChange: DoctorApplicationZodSchema.shape.designation }}
            >
              {(field) => (
                <AppField field={field} label="Designation" placeholder="Consultant" />
              )}
            </form.Field>

            <form.Field
              name="currentWorkingPlace"
              validators={{ onChange: DoctorApplicationZodSchema.shape.currentWorkingPlace }}
            >
              {(field) => (
                <AppField field={field} label="Current Working Place" placeholder="City Hospital" />
              )}
            </form.Field>

            <form.Field name="appointmentFee" validators={{ onChange: feeFieldValidator }}>
              {(field) => (
                <AppField field={field} label="Consultation Fee (৳)" type="number" placeholder="800" />
              )}
            </form.Field>
          </div>

          <form.Field name="message">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Message (optional)</Label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Anything you'd like us to know."
                  className="min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Submitting..."
                disabled={!canSubmit}
              >
                Submit Application
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  )
}

export default DoctorApplicationForm
