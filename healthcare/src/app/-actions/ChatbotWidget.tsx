"use client"

import { ingestDoctorAction, queryRagAction, getUserRoleAction } from "@/app/-actions/rag.action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { cn } from "@/lib/utils"
import { MessageCircle, RotateCw, Send, Sparkles, X } from "lucide-react"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { toast } from "sonner"

type Message = {
  sender: "user" | "ai"
  text: string
  sources?: string
}

const exampleQueries = ["Neurologist in Dhaka", "Find me a cardiologist", "Top 5 pediatricians"]

const WELCOME_MESSAGE: Message = {
  sender: "ai",
  text: "Hello! I'm Amy. Tell me what kind of doctor you need and I will help you find a good match.",
}

interface ChatbotWidgetProps {
  // When `open` is provided the widget is "controlled": the parent owns the
  // open state (e.g. the floating action menu) and the built-in launcher
  // button is hidden. Omit both to keep the standalone launcher behaviour.
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ChatbotWidget({ open, onOpenChange }: ChatbotWidgetProps = {}) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = isControlled ? open : internalOpen

  // Seeded with the greeting so it shows immediately whether the chat is
  // opened by the standalone launcher or by the parent (controlled) menu.
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRoleAction()
      setUserRole(role)
    }
    fetchUserRole()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleToggleChat = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const askAmy = async (query: string) => {
    const currentQuery = query.trim()
    if (!currentQuery) return

    setMessages((prev) => [...prev, { sender: "user", text: currentQuery }])
    setInputValue("")
    setIsLoading(true)

    const response = await queryRagAction(currentQuery)

    if (response.success) {
      const answerText =
        "answers" in response && response.answers
          ? response.answers
          : "Sorry, I couldn't process that."

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: answerText,
          sources: "sources" in response ? response.sources : undefined,
        },
      ])
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.message || "Sorry, I couldn't find an answer." },
      ])
    }
    setIsLoading(false)
  }

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    await askAmy(inputValue)
  }

  const handleSync = async () => {
    setIsSyncing(true)
    toast.info("Starting doctor data synchronization...")

    const response = await ingestDoctorAction()

    if (response.success) {
      toast.success(response.message, {
        description: `Indexed ${response.indexedCount ?? 0} documents.`,
      })
    } else {
      toast.error("Synchronization failed", {
        description: response.message,
      })
    }
    setIsSyncing(false)
  }

  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN"

  if (!isOpen) {
    // In controlled mode the parent (floating action menu) owns the launcher,
    // so render nothing here when closed.
    if (isControlled) {
      return null
    }
    return (
      <Button
        className="fixed bottom-5 right-5 z-60 size-14 rounded-full shadow-lg md:bottom-6 md:right-6 md:size-16"
        onClick={() => handleToggleChat(true)}
      >
        <MessageCircle className="size-7 md:size-8" />
        <span className="sr-only">Open Amy chat</span>
      </Button>
    )
  }

  return (
    <Card className="fixed inset-x-3 bottom-3 z-60 flex h-[min(76vh,640px)] flex-col gap-0 rounded-xl shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-md">
      <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </span>
          <div>
            <CardTitle>Amy</CardTitle>
            <p className="text-xs text-muted-foreground">Doctor finder assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => handleToggleChat(false)}>
          <X className="size-4" />
          <span className="sr-only">Close chat</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-fit max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm leading-relaxed",
                message.sender === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted",
              )}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.sender === "ai" && message.sources && (
                <p className="text-xs text-muted-foreground">{message.sources}</p>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 self-start rounded-lg bg-muted px-3 py-2">
              <Loader size={16} label="Amy is checking" />
              <span className="text-sm text-muted-foreground">Amy is checking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 border-t px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">Try:</p>
          {exampleQueries.map((query) => (
            <Button
              key={query}
              variant="outline"
              size="sm"
              onClick={() => askAmy(query)}
              disabled={isLoading}
            >
              {query}
            </Button>
          ))}
        </div>

        {isAdmin && (
          <Button
            onClick={handleSync}
            disabled={isSyncing}
            variant="secondary"
            className="w-full"
          >
            {isSyncing ? (
              <Loader size={16} className="mr-2" label="Syncing" />
            ) : (
              <RotateCw className="mr-2 size-4" />
            )}
            Sync Doctor Data
          </Button>
        )}

        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
            <Send className="size-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default ChatbotWidget
