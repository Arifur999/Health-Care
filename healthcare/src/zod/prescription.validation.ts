import { z } from "zod";

export const CreatePrescriptionZodSchema = z.object({
    appointmentId: z.string().min(1, "Appointment is required"),
    instructions: z.string().min(1, "Instructions are required"),
    followUpDate: z.string().min(1, "Follow-up date is required"),
});

export type ICreatePrescriptionForm = z.infer<typeof CreatePrescriptionZodSchema>;

export const UpdatePrescriptionZodSchema = z.object({
    instructions: z.string().min(1, "Instructions are required"),
    followUpDate: z.string().min(1, "Follow-up date is required"),
});

export type IUpdatePrescriptionForm = z.infer<typeof UpdatePrescriptionZodSchema>;
