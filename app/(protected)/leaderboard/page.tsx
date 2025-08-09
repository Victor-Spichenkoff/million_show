"use client"

import {Header} from "@/components/template/header";
import {useEffect, useState} from "react";
import {HomeInfos} from "@/types/responses/home";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {CacheIds} from "@/util/cache";
import {PlayersTable} from "@/components/leaderboard/playersTable";
import {PointsInfoForPlayer} from "@/types/responses/points";
import {GetUserStorage} from "@/storage/localStorage/user";
import {PlayerPointsInfo} from "@/components/leaderboard/playerPointsInfo";

export default function LeaderboardPage() {
    const user = GetUserStorage()
    const [homeInfo, setHomeInfo] = useState<HomeInfos | null>(null)
    const getHomeData = useProtectedApiCall<HomeInfos>({
        endpoint: "/historic/home",
        cacheId: CacheIds.homeDashboard
    })


    useEffect(() => {
        (async () => {
            const res = await getHomeData()
            if (!res.isError)
                setHomeInfo(res.response)
        })()
    }, [])


    return (<div className={"pb-8"} suppressHydrationWarning>
        <Header label={"Leaderboard"} showBackButton showConfig/>

        <div className={"px-4 my-8"}>

            <PlayerPointsInfo playerId={Number(user?.id ?? 0)}/>

        </div>
        <div>
            <PlayersTable/>
        </div>
    </div>)

}
