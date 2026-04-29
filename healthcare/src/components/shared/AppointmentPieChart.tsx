
interface AppointmentPieChartProps {
    data : PieChartData[]
    title ?: string
    description ?: string
}

const CHART_COLORS = [
  "oklch(0.646 0.222 41.116)", // chart-1 - orange
  "oklch(0.6 0.118 184.704)", // chart-2 - teal
  "oklch(0.398 0.07 227.392)", // chart-3 - blue
  "oklch(0.828 0.189 84.429)", // chart-4 - lime
  "oklch(0.769 0.188 70.08)", // chart-5 - orange variant
];
