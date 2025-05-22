"use client"

import {Header} from "@/components/template/header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {HomeInfos} from "@/types/responses/home";
import {HomeSkeleton} from "@/components/home/homeSkeleton";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";

export default function Home() {
    const router = useRouter()
    const [homeInfo, setHomeInfo] = useState<HomeInfos | null>(null)
    const getHomeData = useProtectedApiCall<HomeInfos>({
        endpoint: "/historic/home"
    })

    //TODO: Pegar os dados e salvar se tem algo novo
    useEffect(() => {
        (async () => {
            const result = await getHomeData()
            if (!result.isError)
                setHomeInfo(result.response)
        })()
    }, [])


    const handleNewButton = () => {
        // TODO: Testar se está com um já ativo
        router.push("/match")
    }


    return (<>
        <Header label="Home" showConfig showLogo/>
        <div className="flex flex-col items-center text-2xl h-screen w-screen">
            {homeInfo ? (<>
                <Link href={"/leaderboard"}>LeaderBoard</Link>
                <Button onClick={handleNewButton}>New</Button>
                <Button disabled={!homeInfo.alreadyStarted}>Continue</Button>

            </>) : <HomeSkeleton/>}
        </div>
    </>)
}
