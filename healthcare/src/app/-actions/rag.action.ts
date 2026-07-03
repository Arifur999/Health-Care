"use server"

import { ingestDoctorService, queryRagService } from "@/services/rag.services";

export const queryRagAction = async (query: string, ) => {
    try {
        const response = await queryRagService({ query });

        if (!response?.answers) {
            return {
                success: false,
                message: "No answers found in the response.",
            };
        }

        let answers = response?.answers;


        if (typeof answers === "object" &&  answers !== null){
            if ('doctors' in answers && Array.isArray(answers.doctors)){
                const doctors = answers.doctor.slice(0, 5);

                if (doctors.length > 0) {
                    answers = `I found ${doctors.length} doctors who may help you :\n\n`+
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    doctors.map((doctor: any, index: number) => {
                        let text = ``
                        if (doctor.name) text += `Name: ${doctor.name}\n`;
                        if (doctor.specialty) text += `Specialty: ${doctor.specialty}\n`;
                        if (doctor.reason) text += `Reason: ${doctor.reason}\n`;
                        if (doctor.contact) text += `Contact: ${doctor.contact}\n`;
                        return text + "\n"
                    })
                    
                } else {
                    answers = JSON.stringify(answers, null, 2);
                   
                }
            } 
        }

        const sources = 100 -Number(response?.sources[0]?.similarity) * 100;
        return {
            success: true,
            answers: answers as string,
            sources: response.sources.length > 0 ? `${sources.toFixed(2)}% match with the source document` : "No source document match found.",
        };

    } catch (error) {
        console.error("Error querying RAG service:", error);
        return {
            success: false,
            message: "An error occurred while querying the RAG service.",
        };
        
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