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



    return (<div className={"pb-8"}>
        <Header label={"Leaderboard"} showBackButton showConfig/>

        <PlayerPointsInfo playerId={Number(user?.id ?? 0)}/>

        {/*{homeInfo?.leaderBoardPosition && homeInfo?.leaderBoardPosition > 10 && (*/}
            <div>
                Your position #{homeInfo?.leaderBoardPosition}
            </div>
        {/*)}*/}
        <div>
            <PlayersTable/>
        </div>
    </div>)

}
