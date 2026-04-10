import { LoginAction } from "@/app/(commonLayout)/(auth)/login/_action";
import { ILogin } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginForm = () => {
    const queryClient = useQueryClient();
    const {mutateAsync ,isPending} =useMutation({
        mutationFn:(payload : ILogin) => LoginAction(payload),
    })

    const form =useForm({
        defaultValues:{
            email:"",
            password:""
        },
        onSubmit : async ({value}) => {
            try {
                const result = await mutateAsync(value);
            } catch (error) {
                
            }
        }

    })
}
