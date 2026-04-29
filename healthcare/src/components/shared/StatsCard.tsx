import { createElement } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";

interface StatsCardProps{
    title:string;
    value:string | number;
    iconName:string;
    description?:string;
    className?:string;
}

const StatsCard =({title,value,iconName,description,className}:StatsCardProps)=>{
    return(
      <Card className={cn("hover:shadow-md transition-shadow ",className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
                {title}
            </CardTitle>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {
                        createElement(getIconComponent(iconName),{className:"w-6 h-6"})
                    }
                </div>



        </CardHeader>
      </Card>
    )

}

export default StatsCard;