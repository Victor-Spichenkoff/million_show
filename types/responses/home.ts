import {Historic} from "@/types/Historic";

export type HomeInfos = {
    points: number | string
    leaderBoardPosition?: null | number
    correctAnswers: number | string
    accumulatedPrizes?: null | number
    matchId: null | number
    recentHistoric: Historic[] | null
}
