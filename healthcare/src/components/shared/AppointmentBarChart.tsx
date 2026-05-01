import { BarChartData } from "@/types/dashboard.types";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface AppointmentBarChartProps {
    data : BarChartData[]
}

const AppointmentBarChart = ({data}: AppointmentBarChartProps) => {

        if(!data || !Array.isArray(data)){
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Appointment Trends</CardTitle>
                    <CardDescription>Monthly Appointment Statistics</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-75">
                    <p className="text-sm text-muted-foreground">
                        Invalid data provided for the chart.
                    </p>
                </CardContent>
            </Card>
        )
    }


    const formattedData = data.map((item) => ({
        month : typeof item.month === "string" ? format(new Date(item.month), "MMM yyyy") : format(item.month, "MMM yyyy"),

        appointments : Number(item.count)
    }))


    if(!formattedData.length || formattedData.every(item => item.appointments === 0)){
        return (
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Appointment Trends</CardTitle>
              <CardDescription>Monthly Appointment Statistics</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-75">
              <p className="text-sm text-muted-foreground">
                No appointment data available.
              </p>
            </CardContent>
          </Card>
        );
    }

    return (
        <div>   </div>
    )
}

export default AppointmentBarChart