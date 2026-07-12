export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum BloodGroup {
  A_POSITIVE = "A_POSITIVE",
  A_NEGATIVE = "A_NEGATIVE",
  B_POSITIVE = "B_POSITIVE",
  B_NEGATIVE = "B_NEGATIVE",
  AB_POSITIVE = "AB_POSITIVE",
  AB_NEGATIVE = "AB_NEGATIVE",
  O_POSITIVE = "O_POSITIVE",
  O_NEGATIVE = "O_NEGATIVE",
}

export interface IMedicalReport {
  id: string
  reportName: string
  reportLink: string
  createdAt?: string
}

export interface IPatientHealthData {
  id?: string
  gender?: Gender
  dateOfBirth?: string
  bloodGroup?: BloodGroup
  hasAllergies?: boolean
  hasDiabetes?: boolean
  height?: string
  weight?: string
  smokingStatus?: boolean
  dietaryPreferences?: string
  pregnancyStatus?: boolean
  mentalHealthHistory?: string
  immunizationStatus?: string
  hasPastSurgeries?: boolean
  recentAnxiety?: boolean
  recentDepression?: boolean
  maritalStatus?: string
}

export interface IPatientProfile {
  id: string
  name: string
  email: string
  profilePhoto?: string
  contactNumber?: string
  address?: string
  medicalReports?: IMedicalReport[]
  patientHealthData?: IPatientHealthData | null
}

export interface IUpdatePatientInfoPayload {
  name?: string
  profilePhoto?: string
  contactNumber?: string
  address?: string
}

export interface IUpdatePatientMedicalReportPayload {
  reportId?: string
  reportName?: string
  reportLink?: string
  shouldDelete?: boolean
}

export interface IPatientListItem {
  id: string
  name: string
  email: string
  profilePhoto?: string
  contactNumber?: string
  address?: string
  createdAt?: string
  user?: {
    status?: string
    emailVerified?: boolean
  }
}

export interface IUpdatePatientProfilePayload {
  patientInfo?: IUpdatePatientInfoPayload
  patientHealthData?: Partial<IPatientHealthData>
  medicalReports?: IUpdatePatientMedicalReportPayload[]
}
