import {useProtectedApiCall} from "@/hooks/useProtectedApiCall"
import {GetConfigStorage} from "@/storage/localStorage/config"
import {Question} from "@/types/responses/question"
import {useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import {CacheIds} from "@/util/cache";

// It's just to implement skeleton loading on fullQuestion and help exchange
export type ISetFrontendQuestion = (q: FrontendQuestion) => void
export type FrontendQuestion = Question | null | "loading"

export const useGetQuestion = () => {
    const searchParams = useSearchParams()
    const [question, setQuestion] = useState<FrontendQuestion>(null)
    const isPortuguese = GetConfigStorage()?.isPortuguese

    const getCurrentQuestion = useProtectedApiCall({
        endpoint: "/match/current/question",
        cacheId: CacheIds.currentQuestion
    })

    const createAndGetNewQuestion = useProtectedApiCall<Question>({
        endpoint: `/match/next?isEn=${isPortuguese ? "false" : "true"}`
    })


    const getQuestionOnApi = async (getNew?: boolean) => {
        // IN TEST SCENARIOS:
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        // return setQuestion({
        //     "id": 133,
        //     "isBr": false,
        //     "label": "How many months are there in a year?",
        //     "option1": "10",
        //     "option2": "12",
        //     "option3": "11",
        //     "option4": "14",
        //     "level": 1
        // })

        if (searchParams.has("isNew") || getNew) {
            const newResult = await createAndGetNewQuestion()
            if (!newResult.isError)
                return setQuestion(newResult.response)
            else
                console.log("ERROR getting new question: " + newResult.errorMessage)
        }

        const result = await getCurrentQuestion()

        if (!result.isError)
            return setQuestion(result.response)

        // If bypassed
        const newResult = await createAndGetNewQuestion()
        if (!newResult.isError)
            return setQuestion(newResult.response)
    }


    useEffect(() => {
        (async () => {
            await getQuestionOnApi()
        })()
    }, [])

    return {question, setQuestion, getQuestionOnApi}
}
