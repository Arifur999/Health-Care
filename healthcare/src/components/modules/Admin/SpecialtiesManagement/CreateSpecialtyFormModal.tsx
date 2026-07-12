"use client"

import { createSpecialtyAction } from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action"
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
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
    createSpecialtyFormZodSchema,
    type ICreateSpecialtyFormValues,
} from "@/zod/specialty.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ImagePlus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"

const defaultValues: ICreateSpecialtyFormValues = {
  title: "",
  description: "",
}

const CreateSpecialtyFormModal = () => {
  const [open, setOpen] = useState(false)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: FormData) => createSpecialtyAction(formData),
  })

  const resetIcon = useCallback(() => {
    setIconFile(null)
    setIconPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const formData = new FormData()
      formData.append("title", value.title)

      if (value.description) {
        formData.append("description", value.description)
      }

      if (iconFile) {
        formData.append("file", iconFile)
      }

      const result = await mutateAsync(formData)

      if (!result.success) {
        toast.error(result.message || "Failed to create specialty")
        return
      }

      toast.success(result.message || "Specialty created successfully")
      setOpen(false)
      form.reset()
      resetIcon()

      void queryClient.invalidateQueries({ queryKey: ["specialties"] })
      void queryClient.refetchQueries({ queryKey: ["specialties"], type: "active" })
      router.refresh()
    },
  })

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)

      if (!nextOpen) {
        form.reset()
        resetIcon()
      }
    },
    [form, resetIcon],
  )

  const handleIconChange = (file: File | null) => {
    setIconFile(file)
    setIconPreview(file ? URL.createObjectURL(file) : null)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" className="ml-auto shrink-0">
          <Plus className="size-4" />
          Create Specialty
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden p-0 sm:w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-3rem)] md:w-[calc(100vw-4rem)] md:max-w-[calc(100vw-4rem)] lg:w-[min(88vw,32rem)] lg:max-w-[min(88vw,32rem)]"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Create Specialty</DialogTitle>
          <DialogDescription>
            Add a new medical specialty with an optional icon.
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
              <div className="flex items-center gap-4">
                <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary ring-1 ring-foreground/10">
                  {iconPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={iconPreview} alt="Icon preview" className="size-full object-cover" />
                  ) : (
                    <ImagePlus className="size-6" aria-hidden="true" />
                  )}
                </span>
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleIconChange(event.target.files?.[0] ?? null)}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    Choose Icon
                  </Button>
                  <p className="text-xs text-muted-foreground">Optional. PNG or JPG works best.</p>
                </div>
              </div>

              <form.Field
                name="title"
                validators={{ onChange: createSpecialtyFormZodSchema.shape.title }}
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
                      placeholder="Brief description of this specialty..."
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
                <AppSubmitButton isPending={isPending} pendingLabel="Creating..." className="w-auto">
                  Create Specialty
                </AppSubmitButton>
              </DialogFooter>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSpecialtyFormModal
