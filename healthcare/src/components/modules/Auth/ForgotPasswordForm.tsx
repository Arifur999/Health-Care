"use client";
import { forgetPasswordAction } from "@/app/(commonLayout)/(auth)/forgot-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ForgetPasswordZodSchema, IForgetPassword } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IForgetPassword) => forgetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if ("success" in result && !result.success) {
          setServerError(result.message || "Failed to send reset code");
        }
      } catch (error: unknown) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
          throw error;
        }
        const message = error instanceof Error ? error.message : "Failed to send reset code";
        setServerError(message);
      }
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md p-6 shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl text-primary">Forgot your password?</CardTitle>
        <CardDescription>
          Enter your account email and we will send a 6-digit code to reset your password.
        </CardDescription>
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
          <form.Field name="email" validators={{ onChange: ForgetPasswordZodSchema.shape.email }}>
            {(field) => (
              <AppField field={field} label="Email" type="email" placeholder="Enter your email" />
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
                pendingLabel="Sending code..."
                disabled={!canSubmit}
              >
                Send Reset Code
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
