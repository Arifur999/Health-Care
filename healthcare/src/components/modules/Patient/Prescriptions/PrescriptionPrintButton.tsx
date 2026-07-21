"use client"

import { Button } from "@/components/ui/button"
import { type IPrescription } from "@/types/prescription.types"
import { format } from "date-fns"
import { Printer } from "lucide-react"

const formatDate = (value?: string) => {
  if (!value) return "N/A"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy")
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

// Opens a clean, print-formatted prescription in a new window and triggers the
// browser print dialog — which also lets the user "Save as PDF". No external
// PDF dependency, works everywhere.
const PrescriptionPrintButton = ({ prescription }: { prescription: IPrescription }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=900")
    if (!printWindow) return

    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Prescription - ${escapeHtml(prescription.patient?.name ?? "Patient")}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #1f2b6c; margin: 0; padding: 40px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1f2b6c; padding-bottom: 16px; }
  .brand { font-size: 28px; font-weight: 700; letter-spacing: 1px; }
  .brand .accent { color: #159eec; }
  .tagline { font-size: 12px; color: #5b6472; margin-top: 4px; }
  .meta { text-align: right; font-size: 12px; color: #5b6472; }
  .row { display: flex; gap: 40px; margin-top: 24px; }
  .row .col { flex: 1; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #5b6472; }
  .value { font-size: 15px; font-weight: 600; margin-top: 2px; }
  .rx { margin-top: 32px; }
  .rx-symbol { font-size: 32px; font-weight: 700; color: #159eec; }
  .instructions { margin-top: 8px; font-size: 15px; line-height: 1.7; white-space: pre-wrap; border: 1px solid #e4e9f5; border-radius: 8px; padding: 16px; min-height: 120px; }
  .followup { margin-top: 20px; font-size: 14px; }
  .footer { margin-top: 48px; border-top: 1px solid #e4e9f5; padding-top: 12px; font-size: 11px; color: #5b6472; text-align: center; }
  @media print { body { padding: 24px; } }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">MED<span class="accent">DICAL</span></div>
      <div class="tagline">Leading the Way in Medical Excellence</div>
    </div>
    <div class="meta">
      <div>Prescription</div>
      <div>Issued: ${escapeHtml(formatDate(prescription.createdAt))}</div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="label">Patient</div>
      <div class="value">${escapeHtml(prescription.patient?.name ?? "N/A")}</div>
    </div>
    <div class="col">
      <div class="label">Prescribed by</div>
      <div class="value">${escapeHtml(prescription.doctor?.name ?? "N/A")}</div>
      ${prescription.doctor?.designation ? `<div style="font-size:12px;color:#5b6472;">${escapeHtml(prescription.doctor.designation)}</div>` : ""}
    </div>
  </div>

  <div class="rx">
    <span class="rx-symbol">℞</span>
    <div class="instructions">${escapeHtml(prescription.instructions || "No instructions provided.")}</div>
  </div>

  <div class="followup">
    <span class="label">Follow-up date:</span>
    <strong>${escapeHtml(formatDate(prescription.followUpDate))}</strong>
  </div>

  <div class="footer">
    This is a digitally issued prescription from MEDdical. For queries, contact support@meddical.com.
  </div>

  <script>
    window.onload = function () { window.print(); };
  </script>
</body>
</html>`

    printWindow.document.write(html)
    printWindow.document.close()
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handlePrint}>
      <Printer className="size-4" aria-hidden="true" />
      Print / Save as PDF
    </Button>
  )
}

export default PrescriptionPrintButton
