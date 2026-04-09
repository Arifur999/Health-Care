import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AnyFieldApi } from '@tanstack/react-form'


const getErrorMessage = (error:unknown): string  => {
    if (typeof error === "string") {
        return error;
    }
    if (error && typeof error === "object" ) {
        if ("message" in error && typeof error.message === "string") {
            return error.message;
        }
       
    }
    return String(error);
}


type AppFieldProps = {

 field : AnyFieldApi;
 label:string;
 type?:"text" | "email" | "password" | "number";
 placeholder?:string;
 append?:string;
 prepend?:string;
 className?:string;
 disabled?:boolean;

}

const AppField = ({
    field,
    label,
    type="text",
    placeholder,
    append,
    prepend,
    className,
    disabled=false
}:AppFieldProps) => {

    const FirstError = field.state.meta.isTouched && field.state.meta.errors.length > 0 ?
    getErrorMessage(field.state.meta.errors[0]) : null;
    const hasError=FirstError !== null;


    return (
        <div className={cn("space-y-1.5",className)}>
           <Label 
              htmlFor={field.name}
              className={cn(hasError && "text-destructive" )}
              >{label}</Label>
              <div className="relative">
                {
                  prepend && (<div className="absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10">
                    {prepend}
                  </div>)
                
                }

                <input
                  id={field.name}
                  name={field.name}
                  type={type}
                  value={field.state.value}
                  placeholder={placeholder}
                  onBlur={field.handleBlur}
                  onChange={(e)=>field.handleChange(e.target.value)}
                  disabled={disabled}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${field.name}-error` : undefined}
                  className={cn(
                      prepend && "pl-10" ,
                      append && "pr-10" ,
                    
                  )}
                 
                />
                {append && (<div className="absolute inset-y-0 right-0 items-center pr-3 pointer-events-none z-10">
                    {append}
                  </div>)
                }
                {
                    hasError && (
                        <p id={`${field.name}-error`} 
                        role='alert'
                        className="text-destructive text-sm mt-1">
                            {FirstError}
                        </p>
                    )
                }
                </div>
        </div>
    )


}

export default AppField;