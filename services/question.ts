"use client"

import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {Question} from "@/types/responses/question";
//[URGENT]TODO: Precisa lidar com o react e componentização dos hooks
export const getNextQuestion = useProtectedApiCall<Question>({
    endpoint: "/match/next"
})

export const getCurrentQuestion = useProtectedApiCall({
    endpoint: "/match/current/question"
})
