"use client"

import {Header} from "@/components/template/header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useEffect, useState} from "react";
import {HomeInfos} from "@/types/responses/home";
import {HomeSkeleton} from "@/components/home/homeSkeleton";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {toast} from "sonner";
import {Match} from "@/types/responses/match";
import {getNextQuestion} from "@/services/question";

export default function Home() {
    const router = useRouter()
    const [homeInfo, setHomeInfo] = useState<HomeInfos | null>(null)
    const getHomeData = useProtectedApiCall<HomeInfos>({
        endpoint: "/historic/home"
    })

    const createMatch = useProtectedApiCall<Match>({
        endpoint: "/match/start",
        method: "post"
    })

    useEffect(() => {
        (async () => {
            const result = await getHomeData()
            if (!result.isError)
                setHomeInfo(result.response)
        })()
    }, [])


    const handleNewButton = async () => {
        const result = await createMatch()
        if(result.isError)
            return toast.error("Can't create match")

        router.push(`/match/${result.response.id}`)
    }

    const handleContinueButton = () => {
        if(!homeInfo?.alreadyStarted)
            return toast.error("You don't have any started match")

        router.push(`/match/${homeInfo.matchId}`)
    }

console.log(homeInfo)
    return (<>
        <Header label="Home" showConfig showLogo/>
        <div className="flex flex-col items-center text-2xl h-screen w-screen">
            {homeInfo ? (<>
                <Link href={"/leaderboard"}>LeaderBoard</Link>
                <Button onClick={handleNewButton}>New</Button>
                <Button onClick={handleContinueButton} disabled={!homeInfo.alreadyStarted}>Continue</Button>
            </>) : <HomeSkeleton/>}
        </div>
    </>)
}
