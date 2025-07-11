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
    const createMatchForced = useProtectedApiCall<Match>({
        endpoint: "/match/start?force=true",
        method: "post"
    })


    useEffect(() => {
        (async () => {
            const result = await getHomeData()
            if (!result.isError)
                return setHomeInfo(result.response)
        })()
    }, [])


    // Handlers
    const handleNewButton = async (e: any, force?: boolean) => {
        let result
        if (force)
            result = await createMatchForced()
        else
            result = await createMatch()

        if (result.isError)
            return toast.error("Can't create match")

        UpdateHintStateStorage("")
        router.push(`/match/${result.response.id}?isNew`)
    }

    const handleContinueButton = () => {
        if (!homeInfo?.matchId)
            return toast.error("You don't have any started match")
        console.log(homeInfo)

        router.push(`/match/${homeInfo.matchId}`)
    }

    console.log(homeInfo?.matchId)

    return (<>
        <Header label="Home" showConfig showLogo/>
        <div className="flex flex-col items-center text-2xl h-screen w-screen">
            {homeInfo ? (<>
                <Link href={"/leaderboard"}>LeaderBoard</Link>
                {homeInfo.matchId ? (
                    <NewDialog onClick={(e) => handleNewButton(e, true)}/>
                ) : (
                    <Button variant={"gold"} onClick={handleNewButton}>New</Button>
                )}
                <Button onClick={handleContinueButton} disabled={!homeInfo.matchId}>Continue</Button>

            </>) : <HomeSkeleton/>}
        </div>
    </>)
}
