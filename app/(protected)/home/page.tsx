"use client"

import {Header} from "@/components/template/header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {HomeInfos} from "@/types/responses/home";
import {HomeSkeleton} from "@/components/home/homeSkeleton";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {toast} from "sonner";
import {Match} from "@/types/responses/match";
import {NewDialog} from "@/components/home/newDialog";
import {UpdateHintStateStorage} from "@/storage/localStorage/match";
import {HomeActionArea} from "@/components/home/actionArea";
import {HomeStatisticsArea} from "@/components/home/statisticsArea";

export default function Home() {

    const [homeInfo, setHomeInfo] = useState<HomeInfos | null>(null)
    const getHomeData = useProtectedApiCall<HomeInfos>({
        endpoint: "/historic/home"
    })


    useEffect(() => {
        (async () => {
            const result = await getHomeData()
            if (!result.isError)
                return setHomeInfo(result.response)
        })()
    }, [])





    return (<>
        <Header label="Home" showConfig showLogo/>
        <div className="flex flex-col items-center text-2xl h-screen w-screen">
            {homeInfo ? (<>
                <Link href={"/leaderboard"}>LeaderBoard</Link>
                <HomeStatisticsArea homeInfos={homeInfo}/>
                <HomeActionArea homeInfo={homeInfo} />

            </>) : <HomeSkeleton/>}
        </div>
    </>)
}
