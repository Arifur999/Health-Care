import ReadOnlyProfileCard from "@/components/modules/Dashboard/ReadOnlyProfileCard";
import PatientProfileForm from "@/components/modules/Patient/Profile/PatientProfileForm";
import { getUserInfo } from "@/services/auth.services";
import { type IMeResponse } from "@/types/user.types";
import { redirect } from "next/navigation";

const MyProfilePage = async () => {
  const currentUser: IMeResponse | null = await getUserInfo();

  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser.role === "PATIENT" && currentUser.patient) {
    return <PatientProfileForm profile={currentUser.patient} />;
  }

  const profile = currentUser.doctor ?? currentUser.admin;

  if (!profile) {
    return (
      <p className="text-sm text-muted-foreground">
        Your profile information is unavailable right now.
      </p>
    );
  }

  return <ReadOnlyProfileCard profile={profile} role={currentUser.role} />;
};

export default MyProfilePage;
