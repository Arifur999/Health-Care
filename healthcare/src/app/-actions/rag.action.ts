"use server"

import { ingestDoctorService, queryRagService } from "@/services/rag.services";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";

const doctorQueryMap: Record<string, string> = {
    cardiologist: "cardiology",
    cardiologists: "cardiology",
    cardiac: "cardiology",
    heart: "cardiology",
    neurologist: "neurology",
    neurologists: "neurology",
    pediatrician: "pediatrics",
    pediatricians: "pediatrics",
    child: "pediatrics",
    children: "pediatrics",
    dermatologist: "dermatology",
    dermatologists: "dermatology",
    skin: "dermatology",
    gynecologist: "gynecology",
    gynecologists: "gynecology",
    orthopedic: "orthopedics",
    orthopedist: "orthopedics",
}

const getDoctorSearchTerm = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const matchedKey = Object.keys(doctorQueryMap).find((key) => lowerQuery.includes(key));

    return matchedKey ? doctorQueryMap[matchedKey] : query;
}

const formatDoctorsAnswer = (doctors: IDoctor[]) => {
    const topDoctors = doctors.slice(0, 5);

    if(topDoctors.length === 0) {
        return null;
    }

    return `I found ${topDoctors.length} doctors who may help you :\n\n`+
        topDoctors.map((doctor, index) => {
            const specialties = doctor.specialties
                ?.map((item) => item.specialty?.title)
                .filter(Boolean)
                .join(", ");

            let text = `${index + 1}. Name: ${doctor.name}\n`;
            if(specialties) text += `Specialty: ${specialties}\n`;
            if(doctor.designation) text += `Designation: ${doctor.designation}\n`;
            if(doctor.currentWorkingPlace) text += `Working Place: ${doctor.currentWorkingPlace}\n`;
            if(doctor.experience) text += `Experience: ${doctor.experience} years\n`;
            if(doctor.appointmentFee) text += `Fee: ${doctor.appointmentFee}\n`;
            if(doctor.contactNumber) text += `Contact: ${doctor.contactNumber}\n`;
            return text + "\n";
        }).join("");
}

const queryDoctorsFallback = async (query: string) => {
    const searchTerm = getDoctorSearchTerm(query);
    const params = new URLSearchParams({
        searchTerm,
        limit: "5",
        sortBy: "averageRating",
        sortOrder: "desc",
    });

    const response = await getDoctors(params.toString());
    const doctorsAnswer = formatDoctorsAnswer(response.data ?? []);

    if(!doctorsAnswer) {
        return {
            success: false,
            message: "Amy could not find any matching doctors yet. Please add doctors or sync doctor data first.",
        };
    }

    return {
        success: true,
        answers: doctorsAnswer,
        sources: "Matched from the doctors list.",
    };
}

export const queryRagAction = async (query: string, ) => {
    try {
        const response = await queryRagService({ query });
        const answer = response?.answer ?? response?.answers;

        if (!answer) {
            return {
                success: false,
                message: "No answers found in the response.",
            };
        }

        let answers = answer;


        if (typeof answers === "object" &&  answers !== null){
            if ('doctors' in answers && Array.isArray(answers.doctors)){
                const doctors = answers.doctors.slice(0, 5);

                if (doctors.length > 0) {
                    answers = `I found ${doctors.length} doctors who may help you :\n\n`+
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    doctors.map((doctor: any, index: number) => {
                        let text = ``
                        text += `${index + 1}. `
                        if (doctor.name) text += `Name: ${doctor.name}\n`;
                        if (doctor.specialty) text += `Specialty: ${doctor.specialty}\n`;
                        if (doctor.reason) text += `Reason: ${doctor.reason}\n`;
                        if (doctor.contact) text += `Contact: ${doctor.contact}\n`;
                        return text + "\n"
                    }).join("")
                    
                } else {
                    return await queryDoctorsFallback(query);
                   
                }
            } 
        }

        const firstSourceSimilarity = Number(response?.sources?.[0]?.similarity ?? 0);
        const sourceMatch = firstSourceSimilarity * 100;
        return {
            success: true,
            answers: answers as string,
            sources: response.sources?.length > 0 ? `${sourceMatch.toFixed(2)}% match with the source document` : "No source document match found.",
        };

    } catch (error) {
        console.error("Error querying RAG service:", error);

        try {
            return await queryDoctorsFallback(query);
        } catch (fallbackError) {
            console.error("Error querying doctor fallback:", fallbackError);
            return {
                success: false,
                message: "Amy could not connect to the doctor search service. Please make sure the backend is running.",
            };
        }
        
    }
}

export const ingestDoctorAction = async () => {
    try {
        const response = await ingestDoctorService();
        return {
            success: true,
            indexedCount: response.indexedCount,
            message: response.message ??
            "Doctor data ingestion completed successfully.",
        };
    } catch (error) {
        console.error("Error ingesting doctor data:", error);
        return {
            success: false,
            indexedCount: 0,
            message: "An error occurred while ingesting doctor data.",
        };

    }
}

export const getUserRoleAction = async () => {
    try {
        const {getUserInfo} = await import("@/services/auth.services");
        const userInfo = await getUserInfo();
        return userInfo?.role ??  null;

       

        
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
}
