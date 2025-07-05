import {User} from "@/types/user";

export type Match = {
    id: number
    state: States
    hintState: HintState
    skips: number
    halfHalf: number
    universitary: number
    questionIndex: number
    startDate: number
    wrongPrize: number
    stopPrize: number
    nextPrize: number


    historic?: object
    questionState: string
    //TODO: add the real type
    // questionState: QuestionState
    // historic?: Historic

    user?: User
}


export type AnswerActionResponse = {
    isCorrect: true,
    points?: number
} | {
    isCorrect: false,
    finalPrize: number
    correctAnswer: 1 | 2 | 3 | 4,
    points: number
}



type States = "playing" | "lost" | "stopped" | "won" | "cancelled"

type HintState = "none" | "skip" | "half" | "univertitary"
