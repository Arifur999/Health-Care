"use client";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateMyPatientProfile } from "@/services/patient.services";
import { type IMeProfile } from "@/types/user.types";
import { UpdatePatientInfoZodSchema } from "@/zod/patient.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const PatientProfileForm = ({ profile }: { profile: IMeProfile }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(profile.profilePhoto);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      payload,
      photo,
    }: {
      payload: { name: string; contactNumber?: string; address?: string };
      photo: File | null;
    }) =>
      updateMyPatientProfile(
        { patientInfo: payload },
        photo ? { profilePhoto: photo } : undefined,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: profile.name ?? "",
      contactNumber: profile.contactNumber ?? "",
      address: profile.address ?? "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await mutateAsync({ payload: value, photo: selectedPhoto });
        toast.success("Profile updated successfully");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update profile";
        setServerError(message);
      }
    },
  });

  const handlePhotoChange = (file: File | null) => {
    setSelectedPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">My Profile</CardTitle>
        <CardDescription>Update your basic information and profile photo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <Avatar className="size-20 ring-2 ring-secondary">
              <AvatarImage src={photoPreview} alt={profile.name} />
              <AvatarFallback className="text-lg">{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
              />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Camera className="size-4" aria-hidden="true" />
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground">JPG or PNG, up to a few MB.</p>
            </div>
          </div>

          <form.Field name="name" validators={{ onChange: UpdatePatientInfoZodSchema.shape.name }}>
            {(field) => <AppField field={field} label="Full Name" placeholder="Your name" />}
          </form.Field>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.email} disabled />
          </div>

          <form.Field name="contactNumber">
            {(field) => <AppField field={field} label="Contact Number" placeholder="Your phone number" />}
          </form.Field>

          <form.Field name="address">
            {(field) => <AppField field={field} label="Address" placeholder="Your address" />}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Saving..."
                disabled={!canSubmit}
                className="w-auto"
              >
                Save Changes
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientProfileForm;
