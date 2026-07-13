import { Phone } from "lucide-react"

const schedule = [
  { day: "Monday", hours: "09:00 AM - 07:00 PM" },
  { day: "Tuesday", hours: "09:00 AM - 07:00 PM" },
  { day: "Wednesday", hours: "09:00 AM - 07:00 PM" },
  { day: "Thursday", hours: "09:00 AM - 07:00 PM" },
  { day: "Friday", hours: "09:00 AM - 07:00 PM" },
  { day: "Saturday", hours: "09:00 AM - 07:00 PM" },
  { day: "Sunday", hours: "Closed" },
]

const ScheduleHoursCard = () => {
  return (
    <div className="rounded-[5px] bg-primary p-8 text-primary-foreground">
      <h3 className="font-display text-2xl text-secondary">Schedule hours</h3>

      <div className="mt-6 space-y-3 text-sm">
        {schedule.map((item) => (
          <div key={item.day} className="flex items-center justify-between border-b border-primary-foreground/10 pb-3">
            <span>{item.day}</span>
            <span>{item.hours}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Phone className="size-5 text-secondary" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Emergency</p>
          <p className="text-base">(237) 681-812-255</p>
        </div>
      </div>
    </div>
  )
}

export default ScheduleHoursCard
