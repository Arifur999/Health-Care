"use server"

import { queryRagService } from "@/services/rag.services";

export const queryRagAction = async (query: string, ) => {
    try {
        const response = await queryRagService({ query });

        if (!response?.data?.answers) {
            return {
                success: false,
                message: "No answers found in the response.",
            };
        }

        let answers = response?.data?.answers;


        if (typeof answers === "object" &&  answers !== null){
            if ('doctors' in answers && Array.isArray(answers.doctors)){
                const doctors = answers.doctor.slice(0, 5);

                if (doctors.length > 0) {
                    answers = `I found ${doctors.length} doctors who may help you :\n\n`+
                    doctors.map((doctor: any, index: number) => {
                        let text = ``
                        if (doctor.name) text += `Name: ${doctor.name}\n`;
                        if (doctor.specialty) text += `Specialty: ${doctor.specialty}\n`;
                        if (doctor.reason) text += `Reason: ${doctor.reason}\n`;
                        if (doctor.contact) text += `Contact: ${doctor.contact}\n`;
                        return text + "\n"
                    })
                    
                } else {
                    answers = "I couldn't find any doctors who may help you."
                }
            } 
        }

        let sources = 100 -Number(response?.data?.sources[0]?.similarity) * 100;
        return {
            success: true,
            answers: answers as string,
            sources:`${sources.toFixed(2)}% match with the source document`,
        };

    } catch (error) {
        console.error("Error querying RAG service:", error);
        throw error;
    }
}