import { z } from "zod";

export const UpdatePatientInfoZodSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    contactNumber: z.string().max(20, "Contact number must be less than 20 characters").optional().or(z.literal("")),
    address: z.string().max(200, "Address must be less than 200 characters").optional().or(z.literal("")),
});

export type IUpdatePatientInfo = z.infer<typeof UpdatePatientInfoZodSchema>;
