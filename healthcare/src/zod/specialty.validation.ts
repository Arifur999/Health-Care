import { z } from "zod"

export const createSpecialtyFormZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
})

export type ICreateSpecialtyFormValues = z.infer<typeof createSpecialtyFormZodSchema>

export const editSpecialtyFormZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
})

export type IEditSpecialtyFormValues = z.infer<typeof editSpecialtyFormZodSchema>
