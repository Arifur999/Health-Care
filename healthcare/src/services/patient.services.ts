"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type IPatientProfile, type IUpdatePatientProfilePayload } from "@/types/patient.types"

export const updateMyPatientProfile = async (
  payload: IUpdatePatientProfilePayload,
  files?: { profilePhoto?: File; medicalReports?: File[] },
) => {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(payload))

    if (files?.profilePhoto) {
      formData.append("profilePhoto", files.profilePhoto)
    }

    files?.medicalReports?.forEach((file) => {
      formData.append("medicalReports", file)
    })

    return await httpClient.patchFormData<IPatientProfile>("/patients/update-my-profile", formData)
  } catch (error) {
    console.log("Error updating patient profile:", error)
    throw error
  }
}
