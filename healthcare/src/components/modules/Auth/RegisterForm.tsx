"use client";
import { RegisterAction } from "@/app/(commonLayout)/(auth)/register/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IRegister, RegisterZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IRegister) => RegisterAction(payload),
    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const result = await mutateAsync(value) as any;
                if (!result.success) {
                    setServerError(result.message || "Registration failed");
                    return;
                }
                // Success - redirect happens in action
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(`Registration failed: ${error.message}`);
                setServerError(`Registration failed: ${error.message}`);
            }
        },
    });

    return (
        <Card className="w-full max-w-md mx-auto p-6 shadow-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    Create Your Account
                </CardTitle>
                <CardDescription>
                    Sign up to get started with our healthcare services
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    method="POST"
                    action="#"
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <form.Field
                        name="name"
                        validators={{ onChange: RegisterZodSchema.shape.name }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="Full Name"
                                type="text"
                                placeholder="Enter your full name"
                            />
                        )}
                    </form.Field>

                    <form.Field
                        name="email"
                        validators={{ onChange: RegisterZodSchema.shape.email }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        )}
                    </form.Field>

                    <form.Field
                        name="password"
                        validators={{ onChange: RegisterZodSchema.shape.password }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="cursor-pointer"
                                append={
                                    <Button
                                        type="button"
                                        onClick={() => setShowPassword((value) => !value)}
                                        variant="ghost"
                                        size="icon"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" aria-hidden="true" />
                                        ) : (
                                            <Eye className="size-4" aria-hidden="true" />
                                        )}
                                    </Button>
                                }
                            />
                        )}
                    </form.Field>

                    <form.Field
                        name="confirmPassword"
                        validators={{ onChange: RegisterZodSchema.shape.confirmPassword }}
                    >
                        {(field) => (
                            <AppField
                                field={field}
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                className="cursor-pointer"
                                append={
                                    <Button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((value) => !value)}
                                        variant="ghost"
                                        size="icon"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="size-4" aria-hidden="true" />
                                        ) : (
                                            <Eye className="size-4" aria-hidden="true" />
                                        )}
                                    </Button>
                                }
                            />
                        )}
                    </form.Field>

                    {serverError && (
                        <Alert variant={"destructive"}>
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    )}

                    <form.Subscribe
                        selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <AppSubmitButton
                                isPending={isSubmitting || isPending}
                                pendingLabel="Registering...."
                                disabled={!canSubmit}
                            >
                                Create Account
                            </AppSubmitButton>
                        )}
                    </form.Subscribe>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline underline-offset-4 font-medium"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;
