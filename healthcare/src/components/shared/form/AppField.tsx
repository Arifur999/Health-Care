import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AnyFieldApi } from '@tanstack/react-form'


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
    return (
        <div className={cn("space-y-1.5",className)}>
           <Label 
              htmlFor={field.name}
              className={cn("font-medium", disabled && "cursor-not-allowed opacity-50")}
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
                //   aria-invalid={field.state.error ? "true" : "false"}
                // aria-describedby=''
                  className={cn(
                      prepend && "pl-10" ,
                      append && "pr-10" ,
                    
                  )}
                 
                />
                {append && (<div className="absolute inset-y-0 right-0 items-center pr-3 pointer-events-none z-10">
                    {append}
                  </div>)
                }

                </div>
        </div>
    )

}