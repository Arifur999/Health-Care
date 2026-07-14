"use client"

import { Clock3, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const infoCards = [
  { label: "Emergency", lines: ["(237) 681-812-255", "(237) 666-331-894"], icon: Phone, className: "bg-secondary text-primary" },
  { label: "Location", lines: ["0123 Some place", "9876 Some country"], icon: MapPin, className: "bg-primary text-secondary" },
  { label: "Email", lines: ["support@meddical.com", "care@meddical.com"], icon: Mail, className: "bg-secondary text-primary" },
  { label: "Working Hours", lines: ["Mon-Sat 09:00-20:00", "Sunday Emergency only"], icon: Clock3, className: "bg-secondary text-primary" },
]

const fieldClass =
  "w-full rounded-[5px] bg-primary px-4 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/60 outline-none"

const ContactFormSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email, and message")
      return
    }

    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    const subject = encodeURIComponent(form.subject || "Message from Meddical website")
    window.location.href = `mailto:support@meddical.com?subject=${subject}&body=${body}`
    toast.success("Opening your email client to send the message")
  }

  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold uppercase tracking-[2.88px] text-accent">Get in touch</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">Contact</h2>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={fieldClass}
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((v) => ({ ...v, name: event.target.value }))}
            />
            <input
              className={fieldClass}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm((v) => ({ ...v, email: event.target.value }))}
            />
          </div>
          <input
            className={fieldClass}
            placeholder="Subject"
            value={form.subject}
            onChange={(event) => setForm((v) => ({ ...v, subject: event.target.value }))}
          />
          <textarea
            className={fieldClass}
            rows={6}
            placeholder="Message"
            value={form.message}
            onChange={(event) => setForm((v) => ({ ...v, message: event.target.value }))}
          />
          <button
            type="submit"
            className="w-full cursor-pointer rounded-[5px] bg-secondary py-3.5 text-sm font-medium uppercase text-primary transition-colors hover:bg-secondary/80"
          >
            Submit
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4">
          {infoCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className={`rounded-[5px] px-5 py-6 ${card.className}`}>
                <Icon className="size-7" aria-hidden="true" />
                <p className="mt-4 text-base font-bold uppercase tracking-[2.88px]">{card.label}</p>
                <div className="mt-2 space-y-1 text-sm">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection
