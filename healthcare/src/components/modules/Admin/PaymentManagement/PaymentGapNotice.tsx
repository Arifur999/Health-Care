import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const PaymentGapNotice = () => {
  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </span>
          <div>
            <CardTitle>Payment records are not exposed by the API yet</CardTitle>
            <CardDescription className="mt-1">
              There is currently no way for the frontend to fetch real transaction/payment
              records.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          The backend&apos;s payment module (
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            HealthCare-backend/src/app/module/payment/payment.route.ts
          </code>
          ) exposes no routes at all &mdash; only a raw Stripe webhook is mounted at{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">/webhook</code> outside{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">/api/v1</code>, so it isn&apos;t
          callable from this app. Additionally, <code className="rounded bg-muted px-1 py-0.5 text-xs">getAllAppointments</code>{" "}
          on the backend does not <code className="rounded bg-muted px-1 py-0.5 text-xs">include: {"{"} payment: true {"}"}</code>{" "}
          when querying appointments, so per-transaction details (amount, transaction id, invoice
          URL) aren&apos;t available either.
        </p>
        <p>
          To build a real payment/transaction ledger here, the backend would need one of:
        </p>
        <ul className="ml-4 list-disc space-y-1">
          <li>
            A dedicated <code className="rounded bg-muted px-1 py-0.5 text-xs">GET /payments</code>{" "}
            (admin) endpoint backed by the <code className="rounded bg-muted px-1 py-0.5 text-xs">Payment</code> model, or
          </li>
          <li>
            The appointment query updated to <code className="rounded bg-muted px-1 py-0.5 text-xs">include: {"{"} payment: true {"}"}</code>{" "}
            so payment amount/transaction id/invoice URL ride along with each appointment.
          </li>
        </ul>
        <p>
          Until then, the table below shows only the <span className="font-medium text-foreground">payment status</span>{" "}
          (PAID / UNPAID) that already lives directly on each appointment record &mdash; it is not
          a transaction ledger.
        </p>
      </CardContent>
    </Card>
  )
}

export default PaymentGapNotice
