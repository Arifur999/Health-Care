"use client"

import {
  approveDoctorApplicationAction,
  rejectDoctorApplicationAction,
} from "@/app/(dashboardLayout)/admin/dashboard/doctor-applications/_action"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { getDoctorApplications } from "@/services/doctorApplication.services"
import { type DoctorApplicationStatus, type IDoctorApplication } from "@/types/doctorApplication.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { Check, Mail, Phone, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type FilterValue = "ALL" | DoctorApplicationStatus

const filters: { label: string; value: FilterValue }[] = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "All", value: "ALL" },
]

const statusVariant: Record<DoctorApplicationStatus, "secondary" | "outline" | "destructive"> = {
  PENDING: "outline",
  APPROVED: "secondary",
  REJECTED: "destructive",
}

const DoctorApplicationsClient = () => {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<FilterValue>("PENDING")
  const [decision, setDecision] = useState<{
    application: IDoctorApplication
    type: "approve" | "reject"
  } | null>(null)
  const [note, setNote] = useState("")

  const { data: response, isLoading } = useQuery({
    queryKey: ["doctor-applications"],
    queryFn: () => getDoctorApplications(),
  })
  const applications: IDoctorApplication[] = response?.data ?? []
  const visible =
    filter === "ALL" ? applications : applications.filter((item) => item.status === filter)

  const decisionMutation = useMutation({
    mutationFn: async () => {
      if (!decision) return { success: false, message: "No application selected" }
      const trimmedNote = note.trim() || undefined
      return decision.type === "approve"
        ? approveDoctorApplicationAction(decision.application.id, trimmedNote)
        : rejectDoctorApplicationAction(decision.application.id, trimmedNote)
    },
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message || "Action failed")
        return
      }
      toast.success(
        decision?.type === "approve"
          ? "Application approved — doctor account created"
          : "Application rejected",
      )
      setDecision(null)
      setNote("")
      void queryClient.invalidateQueries({ queryKey: ["doctor-applications"] })
    },
    onError: () => toast.error("Action failed"),
  })

  const openDecision = (application: IDoctorApplication, type: "approve" | "reject") => {
    setDecision({ application, type })
    setNote("")
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Doctor Applications</h1>
        <p className="text-sm text-muted-foreground">
          Review applications to join as a doctor. Approving creates the doctor account and emails
          login details.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const count =
            item.value === "ALL"
              ? applications.length
              : applications.filter((a) => a.status === item.value).length
          return (
            <Button
              key={item.value}
              variant={filter === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(item.value)}
            >
              {item.label} ({count})
            </Button>
          )
        })}
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading applications...</p>
      ) : visible.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No applications in this view.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {visible.map((application) => (
            <Card key={application.id}>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{application.name}</p>
                      <Badge variant={statusVariant[application.status]}>{application.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {application.designation} · {application.qualification}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="size-3.5" aria-hidden="true" /> {application.email}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="size-3.5" aria-hidden="true" /> {application.contactNumber}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    {format(new Date(application.createdAt), "MMM dd, yyyy")}
                  </div>
                </div>

                <div className="grid gap-2 rounded-lg border bg-muted/20 p-3 text-sm sm:grid-cols-2">
                  <p><span className="text-muted-foreground">BMDC Reg:</span> {application.registrationNumber}</p>
                  <p><span className="text-muted-foreground">Experience:</span> {application.experience} yrs</p>
                  <p><span className="text-muted-foreground">Working at:</span> {application.currentWorkingPlace}</p>
                  <p><span className="text-muted-foreground">Fee:</span> ৳{application.appointmentFee.toFixed(2)}</p>
                  <p><span className="text-muted-foreground">Gender:</span> {application.gender}</p>
                </div>

                {application.message && (
                  <p className="rounded-lg bg-muted/20 p-3 text-sm text-foreground/90">
                    “{application.message}”
                  </p>
                )}

                {application.reviewNote && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Review note:</span> {application.reviewNote}
                  </p>
                )}

                {application.status === "PENDING" && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button size="sm" onClick={() => openDecision(application, "approve")}>
                      <Check className="size-4" aria-hidden="true" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={() => openDecision(application, "reject")}
                    >
                      <X className="size-4" aria-hidden="true" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={decision !== null} onOpenChange={(open) => !open && setDecision(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {decision?.type === "approve" ? "Approve application" : "Reject application"}
            </DialogTitle>
            <DialogDescription>
              {decision?.type === "approve"
                ? `This creates a doctor account for ${decision?.application.name} and emails login details.`
                : `${decision?.application.name} will be notified by email that their application wasn't approved.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="review-note">Note (optional)</Label>
            <textarea
              id="review-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add an internal or applicant-facing note"
              className="min-h-20 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDecision(null)} disabled={decisionMutation.isPending}>
              Cancel
            </Button>
            <Button
              onClick={() => decisionMutation.mutate()}
              disabled={decisionMutation.isPending}
              variant={decision?.type === "reject" ? "destructive" : "default"}
            >
              {decisionMutation.isPending
                ? "Working..."
                : decision?.type === "approve"
                  ? "Approve & create account"
                  : "Reject application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DoctorApplicationsClient
