"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deletePrescription, getMyPrescriptions, updatePrescription } from "@/services/prescription.services";
import { type IPrescription } from "@/types/prescription.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : format(date, "MMM dd, yyyy");
};

const PrescriptionsList = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<IPrescription | null>(null);
  const [deletingItem, setDeletingItem] = useState<IPrescription | null>(null);
  const [editValues, setEditValues] = useState({ instructions: "", followUpDate: "" });

  const { data: prescriptionsResponse, isLoading } = useQuery({
    queryKey: ["doctor-prescriptions"],
    queryFn: getMyPrescriptions,
  });

  const prescriptions: IPrescription[] = prescriptionsResponse?.data ?? [];

  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ["doctor-prescriptions"] });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { instructions: string; followUpDate: string } }) =>
      updatePrescription(id, payload),
    onSuccess: () => {
      toast.success("Prescription updated");
      setEditingItem(null);
      invalidate();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to update prescription";
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePrescription(id),
    onSuccess: () => {
      toast.success("Prescription deleted");
      setDeletingItem(null);
      invalidate();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to delete prescription";
      toast.error(message);
    },
  });

  const openEdit = (prescription: IPrescription) => {
    setEditingItem(prescription);
    setEditValues({
      instructions: prescription.instructions,
      followUpDate: prescription.followUpDate ? prescription.followUpDate.slice(0, 10) : "",
    });
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading prescriptions...</p>;
  }

  if (prescriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No prescriptions yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Prescriptions you write for completed appointments will show up here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardHeader>
              <CardTitle className="text-base">{prescription.patient?.name ?? "Patient"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
              <p className="text-xs text-muted-foreground">
                Follow-up: {formatDate(prescription.followUpDate)} • Issued {formatDate(prescription.createdAt)}
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => openEdit(prescription)}>
                <Pencil className="size-4" aria-hidden="true" />
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeletingItem(prescription)}
              >
                <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={Boolean(editingItem)} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Prescription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-instructions">Instructions</Label>
              <Textarea
                id="edit-instructions"
                rows={5}
                value={editValues.instructions}
                onChange={(e) => setEditValues((v) => ({ ...v, instructions: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-followup">Follow-up Date</Label>
              <Input
                id="edit-followup"
                type="date"
                value={editValues.followUpDate}
                onChange={(e) => setEditValues((v) => ({ ...v, followUpDate: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              disabled={updateMutation.isPending}
              onClick={() =>
                editingItem &&
                updateMutation.mutate({ id: editingItem.id, payload: editValues })
              }
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deletingItem)} onOpenChange={(open) => !open && setDeletingItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prescription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prescription? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                if (deletingItem) deleteMutation.mutate(deletingItem.id);
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PrescriptionsList;
