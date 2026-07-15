import { Clock3, Mail, MapPin, Phone } from "lucide-react"

const cards = [
  {
    label: "Emergency",
    lines: ["+880 1700-000000", "+880 1800-000000"],
    icon: Phone,
    className: "bg-secondary text-primary",
  },
  {
    label: "Location",
    lines: ["Meddical Hospital Campus", "Dhaka, Bangladesh"],
    icon: MapPin,
    className: "bg-primary text-secondary",
  },
  {
    label: "Email",
    lines: ["support@meddical.com", "care@meddical.com"],
    icon: Mail,
    className: "bg-secondary text-primary",
  },
  {
    label: "Working Hours",
    lines: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"],
    icon: Clock3,
    className: "bg-secondary text-primary",
  },
]

const ContactSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Get in touch</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">Contact</h2>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`rounded-[5px] px-6 py-8 ${card.className}`}>
              <Icon className="size-9" aria-hidden="true" />
              <p className="mt-5 text-lg font-bold uppercase tracking-[2.88px]">{card.label}</p>
              <div className="mt-3 space-y-1 text-base">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ContactSection
