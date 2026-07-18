import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
  size?: number
  label?: string
  /** Use lighter colors so the loader stays visible on a solid dark/primary background. */
  onDark?: boolean
}

const Loader = ({ className, size, label = "Loading", onDark = false }: LoaderProps) => {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("app-loader inline-block", onDark && "app-loader--on-dark", className)}
      style={size ? { ["--loader-size" as string]: `${size}px` } : undefined}
    >
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default Loader
