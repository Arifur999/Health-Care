import { formatCurrency } from "@/lib/currency"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type IMeProfile } from "@/types/user.types";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ReadOnlyProfileCard = ({ profile, role }: { profile: IMeProfile; role: string }) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">My Profile</CardTitle>
        <CardDescription>
          Profile details for {role.toLowerCase().replace("_", " ")} accounts are managed by a super admin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-20 ring-2 ring-secondary">
            <AvatarImage src={profile.profilePhoto} alt={profile.name} />
            <AvatarFallback className="text-lg">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <Badge variant="secondary" className="mt-2 capitalize">
              {role.toLowerCase().replace("_", " ")}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.designation && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Designation</p>
              <p className="text-sm">{profile.designation}</p>
            </div>
          )}
          {profile.qualification && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Qualification</p>
              <p className="text-sm">{profile.qualification}</p>
            </div>
          )}
          {profile.registrationNumber && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Registration Number</p>
              <p className="text-sm">{profile.registrationNumber}</p>
            </div>
          )}
          {profile.currentWorkingPlace && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Working Place</p>
              <p className="text-sm">{profile.currentWorkingPlace}</p>
            </div>
          )}
          {typeof profile.experience === "number" && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Experience</p>
              <p className="text-sm">{profile.experience} years</p>
            </div>
          )}
          {typeof profile.appointmentFee === "number" && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Appointment Fee</p>
              <p className="text-sm">{formatCurrency(profile.appointmentFee)}</p>
            </div>
          )}
          {profile.contactNumber && (
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Contact Number</p>
              <p className="text-sm">{profile.contactNumber}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadOnlyProfileCard;
