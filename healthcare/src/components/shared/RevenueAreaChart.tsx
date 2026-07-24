import { RevenueByMonthData } from "@/types/dashboard.types";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueAreaChartProps {
    data: RevenueByMonthData[];
}

const formatTaka = (value: number) => `৳${Number(value).toLocaleString("en-US")}`;

const RevenueAreaChart = ({ data }: RevenueAreaChartProps) => {
    const formattedData = (Array.isArray(data) ? data : []).map((item) => ({
        month:
            typeof item.month === "string"
                ? format(new Date(item.month), "MMM yyyy")
                : format(item.month, "MMM yyyy"),
        revenue: Number(item.revenue),
    }));

    const hasData = formattedData.length > 0 && formattedData.some((item) => item.revenue > 0);

    return (
        <Card className="col-span-6">
            <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly paid revenue across the platform</CardDescription>
            </CardHeader>
            <CardContent>
                {!hasData ? (
                    <div className="flex h-75 items-center justify-center">
                        <p className="text-sm text-muted-foreground">No revenue data available yet.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={formattedData}>
                            <defs>
                                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#159eec" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#159eec" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis tickLine={false} axisLine={false} dataKey="month" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={70}
                                tickFormatter={(value) => formatTaka(value as number)}
                            />
                            <Tooltip formatter={(value) => [formatTaka(value as number), "Revenue"]} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#1f2b6c"
                                strokeWidth={2}
                                fill="url(#revenueFill)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
};

export default RevenueAreaChart;
