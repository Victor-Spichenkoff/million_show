"use client"

import {Header} from "@/components/template/header";
import {useEffect, useState} from "react";
import {HomeInfos} from "@/types/responses/home";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {CacheIds} from "@/util/cache";
import {PlayersTable} from "@/components/leaderboard/playersTable";

export default function LeaderboardPage() {
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

    return (<>
        <Header label={"Leaderboard"} showBackButton showConfig/>

        {homeInfo?.leaderBoardPosition && homeInfo?.leaderBoardPosition > 10 && (
            <div>
                Your position #{homeInfo?.leaderBoardPosition}
            </div>
        )}
        <div>

            <PlayersTable/>
        </div>
    </>)

}
