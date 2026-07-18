
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type AppSubmitButtonProps = {
    isPending:boolean;
    children:React.ReactNode;
    pendingLabel?:string;
    className?:string;
    disabled?:boolean;
}

const AppSubmitButton = ({
     isPending,
     children,
     pendingLabel,
     className,
     disabled = false,
    }:AppSubmitButtonProps
) => {

    const isDisabled = disabled || isPending;

  return (
    <Button
    type="submit"
    disabled={isDisabled}
    className={cn("w-full transition-all",
        isPending && "cursor-wait disabled:opacity-100",
        !isPending && isDisabled && "cursor-not-allowed opacity-50",
         className
        )}
    >
      { isPending ? (
        <span className="flex items-center justify-center gap-2.5">
          <Loader2 className="size-4.5 animate-spin" aria-hidden="true" />
          <span className="animate-pulse">{pendingLabel ? pendingLabel : children}</span>
        </span>
      ):children

    }
    </Button>
  )
}

export default AppSubmitButton;