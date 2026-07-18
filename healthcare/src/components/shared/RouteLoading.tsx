import Loader from "@/components/shared/Loader"

interface RouteLoadingProps {
  label?: string
}

const RouteLoading = ({ label = "Loading..." }: RouteLoadingProps) => {
  return (
    <div className="flex min-h-75 w-full flex-col items-center justify-center gap-4 py-16">
      <Loader size={40} />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default RouteLoading
