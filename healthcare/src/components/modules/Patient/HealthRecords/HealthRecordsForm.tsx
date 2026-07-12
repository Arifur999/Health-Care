"use client";

import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateMyPatientProfile } from "@/services/patient.services";
import { BloodGroup, Gender, type IMedicalReport, type IPatientHealthData } from "@/types/patient.types";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { FileText, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const booleanFields: { name: keyof IPatientHealthData; label: string }[] = [
  { name: "hasAllergies", label: "Has Allergies" },
  { name: "hasDiabetes", label: "Has Diabetes" },
  { name: "smokingStatus", label: "Smoker" },
  { name: "pregnancyStatus", label: "Pregnant" },
  { name: "hasPastSurgeries", label: "Past Surgeries" },
  { name: "recentAnxiety", label: "Recent Anxiety" },
  { name: "recentDepression", label: "Recent Depression" },
];

interface HealthRecordsFormProps {
  healthData?: IPatientHealthData | null;
  medicalReports: IMedicalReport[];
}

const HealthRecordsForm = ({ healthData, medicalReports }: HealthRecordsFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const healthDataMutation = useMutation({
    mutationFn: (payload: Partial<IPatientHealthData>) =>
      updateMyPatientProfile({ patientHealthData: payload }),
  });

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => updateMyPatientProfile({}, { medicalReports: files }),
  });

  const deleteReportMutation = useMutation({
    mutationFn: (reportId: string) =>
      updateMyPatientProfile({ medicalReports: [{ reportId, shouldDelete: true }] }),
  });

  const form = useForm({
    defaultValues: {
      gender: healthData?.gender ?? "",
      dateOfBirth: healthData?.dateOfBirth ? healthData.dateOfBirth.slice(0, 10) : "",
      bloodGroup: healthData?.bloodGroup ?? "",
      height: healthData?.height ?? "",
      weight: healthData?.weight ?? "",
      hasAllergies: healthData?.hasAllergies ?? false,
      hasDiabetes: healthData?.hasDiabetes ?? false,
      smokingStatus: healthData?.smokingStatus ?? false,
      pregnancyStatus: healthData?.pregnancyStatus ?? false,
      hasPastSurgeries: healthData?.hasPastSurgeries ?? false,
      recentAnxiety: healthData?.recentAnxiety ?? false,
      recentDepression: healthData?.recentDepression ?? false,
      dietaryPreferences: healthData?.dietaryPreferences ?? "",
      mentalHealthHistory: healthData?.mentalHealthHistory ?? "",
      immunizationStatus: healthData?.immunizationStatus ?? "",
      maritalStatus: healthData?.maritalStatus ?? "",
    },
    onSubmit: async ({ value }) => {
      try {
        await healthDataMutation.mutateAsync(value as Partial<IPatientHealthData>);
        toast.success("Health data updated successfully");
        router.refresh();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update health data";
        toast.error(message);
      }
    },
  });

  const handleUploadReports = async () => {
    if (selectedFiles.length === 0) return;
    try {
      await uploadMutation.mutateAsync(selectedFiles);
      toast.success("Medical reports uploaded successfully");
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to upload reports";
      toast.error(message);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await deleteReportMutation.mutateAsync(reportId);
      toast.success("Medical report deleted");
      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete report";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Health Data</CardTitle>
          <CardDescription>Keep your health information up to date for better care.</CardDescription>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <form.Field name="gender">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label>Gender</Label>
                    <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Gender).map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              <form.Field name="dateOfBirth">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Date of Birth</Label>
                    <Input
                      id={field.name}
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="bloodGroup">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label>Blood Group</Label>
                    <Select value={field.state.value} onValueChange={(v) => field.handleChange(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(BloodGroup).map((bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>

              <form.Field name="height">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Height</Label>
                    <Input
                      id={field.name}
                      placeholder="e.g. 170cm"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="weight">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Weight</Label>
                    <Input
                      id={field.name}
                      placeholder="e.g. 65kg"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="maritalStatus">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Marital Status</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {booleanFields.map(({ name, label }) => (
                <form.Field key={name} name={name as never}>
                  {(field) => (
                    <label className="flex items-center gap-2 rounded-lg border p-3 text-sm">
                      <Checkbox
                        checked={Boolean(field.state.value)}
                        onCheckedChange={(checked) => field.handleChange(Boolean(checked) as never)}
                      />
                      {label}
                    </label>
                  )}
                </form.Field>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="dietaryPreferences">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Dietary Preferences</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="immunizationStatus">
                {(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Immunization Status</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="mentalHealthHistory">
                {(field) => (
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor={field.name}>Mental Health History</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || healthDataMutation.isPending}
                  pendingLabel="Saving..."
                  disabled={!canSubmit}
                  className="w-auto"
                >
                  Save Health Data
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Medical Reports</CardTitle>
          <CardDescription>Upload lab results, imaging, or other documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {medicalReports.length === 0 ? (
            <p className="text-sm text-muted-foreground">No medical reports uploaded yet.</p>
          ) : (
            <div className="grid gap-2">
              {medicalReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm"
                >
                  <a
                    href={report.reportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center gap-2 text-primary hover:underline"
                  >
                    <FileText className="size-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{report.reportName}</span>
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={deleteReportMutation.isPending}
                    onClick={() => void handleDeleteReport(report.id)}
                  >
                    <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              className="max-w-xs"
              onChange={(e) => setSelectedFiles(Array.from(e.target.files ?? []))}
            />
            <Button
              type="button"
              onClick={() => void handleUploadReports()}
              disabled={selectedFiles.length === 0 || uploadMutation.isPending}
            >
              <Upload className="size-4" aria-hidden="true" />
              {uploadMutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecordsForm;
