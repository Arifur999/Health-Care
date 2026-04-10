import { LoginAction } from "@/app/(commonLayout)/(auth)/login/_action";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ILogin } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const LoginForm = () => {
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState<string | null>(null);


    const {mutateAsync ,isPending} =useMutation({
        mutationFn:(payload : ILogin) => LoginAction(payload),
    })

    const form =useForm({
        defaultValues:{
            email:"",
            password:""
        },
        onSubmit : async ({value}) => {
            setServerError(null);
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const result = await mutateAsync(value) as any;
                if(!result.success){
                    setServerError(result.message || "Login failed");
                    return;
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(`Login failed: ${error.message}`);
                setServerError(`Login failed: ${error.message}`);
            }
        }

    })

    return (
        <Card className="w-full max-w-md mx-auto p-6 shadow-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    Welcome back! Please login to your account
                </CardTitle>
                <CardDescription>
                    Please enter your credentials to log in.
                </CardDescription>
            </CardHeader>

        </Card>
    )
}

export default LoginForm;