"use server"

import { httpClient } from "@/lib/axios/httpClient"
import {
  type IDoctorApplication,
  type IDoctorApplicationPayload,
} from "@/types/doctorApplication.types"

export const submitDoctorApplication = async (payload: IDoctorApplicationPayload) => {
  try {
    return await httpClient.post<IDoctorApplication>("/doctor-applications", payload)
  } catch (error) {
    console.log("Error submitting doctor application:", error)
    throw error
  }
}

export const getDoctorApplications = async (status?: string) => {
  try {
    const query = status ? `?status=${status}` : ""
    return await httpClient.get<IDoctorApplication[]>(`/doctor-applications${query}`)
  } catch (error) {
    console.log("Error fetching doctor applications:", error)
    throw error
  }
}

export const approveDoctorApplication = async (id: string, reviewNote?: string) => {
  try {
    return await httpClient.patch<IDoctorApplication>(`/doctor-applications/${id}/approve`, {
      reviewNote,
    })
  } catch (error) {
    console.log("Error approving doctor application:", error)
    throw error
  }
}

export const rejectDoctorApplication = async (id: string, reviewNote?: string) => {
  try {
    return await httpClient.patch<IDoctorApplication>(`/doctor-applications/${id}/reject`, {
      reviewNote,
    })
  } catch (error) {
    console.log("Error rejecting doctor application:", error)
    throw error
  }
}
