import {User} from "@/types/User";

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

export type States = "playing" | "lost" | "stopped" | "won" | "cancelled"

export type HintState = "none" | "skip" | "half" | "univertitary"
