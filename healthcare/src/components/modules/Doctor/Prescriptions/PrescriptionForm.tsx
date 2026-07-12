"use client";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPrescription } from "@/services/prescription.services";
import { CreatePrescriptionZodSchema } from "@/zod/prescription.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PrescriptionForm = ({ appointmentId }: { appointmentId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPrescription,
  });

  const form = useForm({
    defaultValues: {
      appointmentId,
      instructions: "",
      followUpDate: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.success("Prescription created successfully");
        void queryClient.invalidateQueries({ queryKey: ["doctor-prescriptions"] });
        router.push("/doctor/dashboard/prescription");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create prescription";
        toast.error(message);
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Write Prescription</CardTitle>
        <CardDescription>Appointment ID: {appointmentId}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="instructions"
            validators={{ onChange: CreatePrescriptionZodSchema.shape.instructions }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Instructions</Label>
                <Textarea
                  id={field.name}
                  rows={5}
                  placeholder="Diagnosis, medicines, dosage, advice..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="followUpDate"
            validators={{ onChange: CreatePrescriptionZodSchema.shape.followUpDate }}
          >
            {(field) => (
              <AppField field={field} label="Follow-up Date" type="date" />
            )}
          </form.Field>

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Saving..."
                disabled={!canSubmit}
                className="w-auto"
              >
                Save Prescription
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrescriptionForm;
