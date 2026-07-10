import { UserRole } from "@/lib/authUtils";
import { IMedicalReport, IPatientHealthData } from "./patient.types";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;

}

export interface IMeProfile {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    designation?: string;
    registrationNumber?: string;
    experience?: number;
    appointmentFee?: number;
    qualification?: string;
    currentWorkingPlace?: string;
    averageRating?: number;
    medicalReports?: IMedicalReport[];
    patientHealthData?: IPatientHealthData | null;
}

export interface IMeResponse {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status?: string;
    emailVerified?: boolean;
    image?: string;
    patient?: IMeProfile;
    doctor?: IMeProfile;
    admin?: IMeProfile;
}