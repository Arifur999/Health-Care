"use client"

import { updateSpecialtyAction } from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { type ISpecialty } from "@/types/specialty.types"
import {
    editSpecialtyFormZodSchema,
    type IEditSpecialtyFormValues,
} from "@/zod/specialty.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

interface EditSpecialtyFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  specialty: ISpecialty | null
}

const getInitialValues = (specialty: ISpecialty | null): IEditSpecialtyFormValues => ({
  title: specialty?.title ?? "",
  description: specialty?.description ?? "",
})

const EditSpecialtyFormModal = ({
  open,
  onOpenChange,
  specialty,
}: EditSpecialtyFormModalProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IEditSpecialtyFormValues }) =>
      updateSpecialtyAction(id, payload),
  })

  const form = useForm({
    defaultValues: getInitialValues(specialty),
    onSubmit: async ({ value }) => {
      if (!specialty) {
        toast.error("Specialty not found")
        return
      }

      const result = await mutateAsync({
        id: specialty.id,
        payload: value,
      })

      if (!result.success) {
        toast.error(result.message || "Failed to update specialty")
        return
      }

      toast.success(result.message || "Specialty updated successfully")
      onOpenChange(false)

      void queryClient.invalidateQueries({ queryKey: ["specialties"] })
      void queryClient.refetchQueries({ queryKey: ["specialties"], type: "active" })
      router.refresh()
    },
  })

  useEffect(() => {
    if (open) {
      form.reset(getInitialValues(specialty))
    }
  }, [form, open, specialty])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(88vw,32rem)] lg:max-w-[min(88vw,32rem)]"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Edit Specialty</DialogTitle>
          <DialogDescription>
            Update the specialty title and description. Icon re-upload is not supported yet.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="px-6 py-5">
            <form
              method="POST"
              action="#"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-5"
            >
              <form.Field
                name="title"
                validators={{ onChange: editSpecialtyFormZodSchema.shape.title }}
              >
                {(field) => <AppField field={field} label="Title" placeholder="e.g. Cardiology" />}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Description</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <AppSubmitButton isPending={isPending} pendingLabel="Updating..." className="w-auto">
                  Save Changes
                </AppSubmitButton>
              </DialogFooter>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default EditSpecialtyFormModal
