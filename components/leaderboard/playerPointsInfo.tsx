import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {PointsInfoForPlayer} from "@/types/responses/points";
import {GetUserStorage} from "@/storage/localStorage/user";
import {useEffect, useState} from "react";
import {CacheIds} from "@/util/cache";

interface PlayerPointsInfo {
    playerId: number
}

export const PlayerPointsInfo = ({playerId}:PlayerPointsInfo) => {
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

    return (
        <div>
            { user?.userName == playerPointInfo?.userName ? "YOU" : playerPointInfo?.userName}
        </div>
    )
}
