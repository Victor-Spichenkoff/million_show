import { useProtectedApiCall } from "@/hooks/useProtectedApiCall"
import { GetConfigStorage } from "@/storage/localStorage/config"
import { Question } from "@/types/responses/question"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export const useGetQuestion = () => {
        const searchParams = useSearchParams()
        const [question, setQuestion] = useState<Question | null>(null)
        const isPortuguese = GetConfigStorage()?.isPortuguese
     
        const getCurrentQuestion = useProtectedApiCall({
            endpoint: "/match/current/question"
        })
    
        const createAndGetNewQuestion = useProtectedApiCall<Question>({
            endpoint: `/match/next?isEn=${isPortuguese ? "false" : "true"}`
        })
    
    
        useEffect(() => {
            (async () => {
                // To avoid unnecessary call, but can be passed
                if (searchParams.has("isNew")) {
                    const newResult = await createAndGetNewQuestion()
                    if (!newResult.isError)
                        return setQuestion(newResult.response)
                }
    
                const result = await getCurrentQuestion()
    
                if (!result.isError)
                    return setQuestion(result.response)
    
                // If bypassed
                const newResult = await createAndGetNewQuestion()
                if (!newResult.isError)
                    return setQuestion(newResult.response)
            })()
        }, [])
    
        return { question, setQuestion }
}