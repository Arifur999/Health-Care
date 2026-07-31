"use client"

import ChatbotWidget from "@/app/-actions/ChatbotWidget"
import { cn } from "@/lib/utils"
import { Headset, MessageCircleMore, Sparkles, X } from "lucide-react"
import { useState } from "react"

// A single floating launcher that expands into the contact options (WhatsApp +
// the Amy AI chat), instead of two separate buttons stacked in the corner.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000"
const WHATSAPP_MESSAGE = "Hello MEDdical, I'd like to ask about an appointment."

const FloatingActions = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  const openChat = () => {
    setChatOpen(true)
    setMenuOpen(false)
  }

  return (
    <>
      {/* While the chat panel is open it takes over the corner, so hide the dial. */}
      {!chatOpen && (
        <>
          {/* Click-away layer to close the expanded menu. */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-50"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div className="fixed bottom-5 right-5 z-60 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
            {/* Sub-actions, revealed when the menu is open. */}
            <div
              className={cn(
                "flex flex-col items-end gap-3 transition-all duration-200",
                menuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <span className="rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background shadow-sm">
                  WhatsApp
                </span>
                <span className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105">
                  <MessageCircleMore className="size-6" aria-hidden="true" />
                </span>
              </a>

              <button
                type="button"
                onClick={openChat}
                aria-label="Ask Amy, the AI doctor-finder assistant"
                className="flex items-center gap-2"
              >
                <span className="rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-medium text-background shadow-sm">
                  Ask Amy
                </span>
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105">
                  <Sparkles className="size-6" aria-hidden="true" />
                </span>
              </button>
            </div>

            {/* Main launcher. */}
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close contact menu" : "Contact us"}
              aria-expanded={menuOpen}
              className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:size-16"
            >
              <X
                className={cn(
                  "absolute size-7 transition-all duration-200",
                  menuOpen ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
                )}
                aria-hidden="true"
              />
              <Headset
                className={cn(
                  "size-7 transition-all duration-200 md:size-8",
                  menuOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </>
      )}

      {/* The chat panel, driven by this menu. */}
      <ChatbotWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  )
}

export default FloatingActions
