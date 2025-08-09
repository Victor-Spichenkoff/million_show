export type LeaderboardPlayers = {
    userId: number
    userName: string
    bestMatchCorrects: number
    totalPoints: number
    totalCorrects: number
    totalUsedHelps: number
    avgTotalTime: number
}


export type PointsInfoForPlayer = {
    userId: number
    userName: string
    totalPoints: number
    bestMatch: number
    position: number
    bestMatchPoints: number
    bestMatchTime: number
}
