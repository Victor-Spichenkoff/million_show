"use client"

import {useParams} from "next/navigation"
import {useEffect, useState} from "react";
import {Question} from "@/types/responses/question";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";

export default function Match() {
    const {id} = useParams()
    const [question, setQuestion] = useState<Question | null>(null)
    const getNextQuestion = useProtectedApiCall<Question>({
        endpoint: "/match/next"
    })

    const getCurrentQuestion = useProtectedApiCall({
        endpoint: "/match/current/question"
    })


    useEffect(() => {
        (async () => {
            const result = await getCurrentQuestion()

            if (!result.isError)
                return setQuestion(result.response)

            console.log("GET NEW")
            // const newQuestion = await getNextQuestion()
        })()
    }, [])

    return (
        <div>
            match {question?.label}
        </div>
    )
}
