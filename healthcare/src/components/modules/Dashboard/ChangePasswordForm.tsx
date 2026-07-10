"use client";
import { changePasswordAction } from "@/app/(dashboardLayout)/(commonProtectedLayout)/change-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordZodSchema, IChangePassword } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IChangePassword) => changePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value, formApi }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if (!result.success) {
          setServerError(result.message || "Failed to change password");
          return;
        }
        toast.success("Password changed successfully");
        formApi.reset();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to change password";
        setServerError(message);
      }
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md p-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Change Password</CardTitle>
        <CardDescription>Update your password to keep your account secure.</CardDescription>
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
          <form.Field name="currentPassword">
            {(field) => (
              <AppField
                field={field}
                label="Current Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your current password"
                append={
                  <Button type="button" onClick={() => setShowPassword((v) => !v)} variant="ghost" size="icon">
                    {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="newPassword"
            validators={{ onChange: ChangePasswordZodSchema.shape.newPassword }}
          >
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
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
                pendingLabel="Updating..."
                disabled={!canSubmit}
              >
                Update Password
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
