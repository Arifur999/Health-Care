"use client";
import { resetPasswordAction } from "@/app/(commonLayout)/(auth)/reset-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { IResetPassword, ResetPasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ResetPasswordFormProps {
  initialEmail?: string;
}

const ResetPasswordForm = ({ initialEmail }: ResetPasswordFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IResetPassword) => resetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: initialEmail ?? "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if ("success" in result && !result.success) {
          setServerError(result.message || "Failed to reset password");
        }
      } catch (error: unknown) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
          throw error;
        }
        const message = error instanceof Error ? error.message : "Failed to reset password";
        setServerError(message);
      }
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md p-6 shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl text-primary">Reset your password</CardTitle>
        <CardDescription>Enter the 6-digit code sent to your email and choose a new password.</CardDescription>
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
          <form.Field name="email" validators={{ onChange: ResetPasswordZodSchema.shape.email }}>
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

          <form.Field
            name="newPassword"
            validators={{ onChange: ResetPasswordZodSchema.shape.newPassword }}
          >
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                append={
                  <Button type="button" onClick={() => setShowPassword((v) => !v)} variant="ghost" size="icon">
                    {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <AppField
                field={field}
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your new password"
              />
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
                pendingLabel="Resetting password..."
                disabled={!canSubmit}
              >
                Reset Password
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
