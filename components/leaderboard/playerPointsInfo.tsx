"use client"

import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {PointsInfoForPlayer} from "@/types/responses/points";
import {GetUserStorage} from "@/storage/localStorage/user";
import {useEffect, useState} from "react";
import {CacheIds} from "@/util/cache";
import {minuteWithSeconds} from "@/helpers/time";

interface PlayerPointsInfo {
    playerId: number
}

export const PlayerPointsInfo = ({playerId}: PlayerPointsInfo) => {
    const [playerPointInfo, setPlayerPointInfo] = useState<PointsInfoForPlayer | null>(null)
    const user = GetUserStorage()
    const getPlayerInfo = useProtectedApiCall<PointsInfoForPlayer>({
        endpoint: `/points/player/${playerId}`,
        cacheId: CacheIds.playerInfos
    })

    useEffect(() => {
        (async () => {
            const res = await getPlayerInfo()
            if (!res.isError)
                setPlayerPointInfo(res.response)
        })()
    }, [])


    if (!user || !playerPointInfo)
        return null

    const bestTime = minuteWithSeconds(playerPointInfo.bestMatchTime)

    return (
        <div className={`grid grid-cols-3 gap-4 w-full bg-question text-text/80 px-6 py-4 rounded-lg shadow-md
        hover:scale-[103%] duration-300`}>
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">Position #{playerPointInfo.position}</span>
            <span className="font-semibold text-text/80">
              {user.userName === playerPointInfo.userName ? `${user.userName} (YOU)` : playerPointInfo.userName}
            </span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Best Match</span>
                <span className="font-medium"></span>
                {/*<span className="font-medium">{playerPointInfo.bestMatchPoints} pts in {bestTime.min}m {bestTime.sec}s</span>*/}
                <span className="font-medium">{playerPointInfo.bestMatchPoints} pts</span>
                <span className="text-xs text-foreground/60">{bestTime.min}m {bestTime.sec}s</span>
            </div>

            <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">Total Points</span>
                <span className="text-xl font-bold">{playerPointInfo.totalPoints}</span>
            </div>
        </div>


    //     <div
    //         className="flex justify-between items-center w-full bg-zinc-800 text-white px-6 py-3 rounded-lg shadow-lg shadow-black/50">
    //         <div className="flex flex-col">
    // <span className="text-lg font-semibold">
    //   {user.userName === playerPointInfo.userName ? `${user.userName} (YOU)` : playerPointInfo.userName}
    // </span>
    //             <span className="text-sm text-gray-400">#{playerPointInfo.position}</span>
    //         </div>
    //
    //         <div className="text-center">
    //             <div className="text-sm text-gray-300">Melhor partida</div>
    //             <div className="font-medium">{playerPointInfo.bestMatchPoints} pts em {bestTime.min}m {bestTime.sec}s
    //             </div>
    //         </div>
    //
    //         <div className="text-right">
    //             <div className="text-sm text-gray-300">Total</div>
    //             <div className="text-lg font-bold">{playerPointInfo.totalPoints} pts</div>
    //         </div>
    //     </div>




        // <div className={"flex justify-between w-full bg-green-600 px-4 py-2 rounded-md shadow-md shadow-black/70"}>
        //     <div>{(user.userName === playerPointInfo.userName ? `${user.userName} (YOU)` : playerPointInfo.userName)}</div>
        //     <div>#{playerPointInfo.position}</div>
        //     <div>{playerPointInfo.bestMatchPoints}pts in {bestTime.min}min {bestTime.sec}sec</div>
        //     <div>{playerPointInfo.totalPoints}pts</div>
        // </div>
    )
}

// ‍♂️ Nome do jogador (você pode colocar "Você" se for o próprio user logado)
//
// 🏅 Sua posição atual (ex: 112º)
//
// 🏆 Pontuação total
//
// 📈 Melhor partida (ex: 92 pt's em 1m43s)
