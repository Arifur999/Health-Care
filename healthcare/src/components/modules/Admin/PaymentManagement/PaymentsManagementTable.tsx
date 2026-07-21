"use client";

import { formatCurrency } from "@/lib/currency"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllPayments } from "@/services/payment.services";
import { type IPayment } from "@/types/payment.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FileText } from "lucide-react";

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy hh:mm a");
};

const PaymentsManagementTable = () => {
  const { data: paymentsResponse, isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: getAllPayments,
  });

  const payments: IPayment[] = paymentsResponse?.data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <p className="text-sm text-muted-foreground">
          {payments.length} payment{payments.length === 1 ? "" : "s"} total.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    Loading payments...
                  </TableCell>
                </TableRow>
              ) : payments.length ? (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.appointment?.patient?.name ?? "N/A"}</TableCell>
                    <TableCell>{payment.appointment?.doctor?.name ?? "N/A"}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell className="font-mono text-xs">{payment.transactionId}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === "PAID" ? "secondary" : "outline"}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>
                      {payment.invoiceUrl ? (
                        <Button asChild variant="outline" size="sm">
                          <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="size-4" aria-hidden="true" />
                            Invoice
                          </a>
                        </Button>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No payments recorded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsManagementTable;
