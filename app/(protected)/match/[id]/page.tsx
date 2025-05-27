"use client"

import {useParams, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react";
import {Question} from "@/types/responses/question";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {GetConfigStorage} from "@/storage/localStorage/config";
import {Header} from "@/components/template/header";

export default function Match() {
    const {id} = useParams()
    const [question, setQuestion] = useState<Question | null>(null)
    const searchParams = useSearchParams()
    const isPortuguese= GetConfigStorage()?.isPortuguese

    const getCurrentQuestion = useProtectedApiCall({
        endpoint: "/match/current/question"
    })

    const createAndGetNewQuestion = useProtectedApiCall<Question>({
        endpoint: `/match/next?isEn=${isPortuguese ? "false" : "true"}`
    })


    useEffect(() => {
        (async () => {
            // To avoid unnecessary call, but can be passed
            if(searchParams.has("isNew")) {
                const newResult = await createAndGetNewQuestion()
                if(!newResult.isError)
                    return setQuestion(newResult.response)
            }

            const result = await getCurrentQuestion()

            if (!result.isError)
                return setQuestion(result.response)

            // If bypassed
            const newResult = await createAndGetNewQuestion()
            if(!newResult.isError)
                return setQuestion(newResult.response)
        })()
    }, [])

    return (<>
        <Header label={"Million Show"} showBackButton showConfig/>
        <div>
            match {question?.label}
        </div>
    </>)
}
