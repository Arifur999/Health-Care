"use client";
import { verifyEmailAction } from "@/app/(commonLayout)/(auth)/verify-email/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { IVerifyEmail, VerifyEmailZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface VerifyEmailFormProps {
  initialEmail?: string;
}

const VerifyEmailForm = ({ initialEmail }: VerifyEmailFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IVerifyEmail) => verifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: initialEmail ?? "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if ("success" in result && !result.success) {
          setServerError(result.message || "Failed to verify email");
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to verify email";
        setServerError(message);
      }
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md p-6 shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
        <CardDescription>Enter the 6-digit code we sent to your email to activate your account.</CardDescription>
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
          <form.Field name="email" validators={{ onChange: VerifyEmailZodSchema.shape.email }}>
            {(field) => (
              <AppField field={field} label="Email" type="email" placeholder="Enter your email" />
            )}
          </form.Field>

          <form.Field name="otp">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Verification Code</Label>
                <InputOTP
                  maxLength={6}
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  onBlur={field.handleBlur}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">{String(field.state.meta.errors[0])}</p>
                )}
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
                pendingLabel="Verifying..."
                disabled={!canSubmit}
              >
                Verify Email
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailForm;
