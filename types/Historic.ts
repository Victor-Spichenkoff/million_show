import {Question} from "@/types/responses/question";
import {Match} from "@/types/responses/match";
import {User} from "@/types/user";

export type Historic = {
    id: number
    finalPrize: number
    finishDate: number
    finalState?: States
    match: Match
    user: User
    questions: Question[]
    historicQuestions?: any[]
}


export type States = "playing" | "lost" | "stopped" | "won" | "cancelled"
