import { MessageCircleMore } from "lucide-react"

// WhatsApp is a near-universal expectation for healthcare sites in Bangladesh.
// Sits just above the chat widget (which owns the very bottom-right corner).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000"
const WHATSAPP_MESSAGE = "Hello MEDdical, I'd like to ask about an appointment."

const WhatsAppButton = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-28 md:right-6"
    >
      <MessageCircleMore className="size-7" aria-hidden="true" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  )
}

export default WhatsAppButton
