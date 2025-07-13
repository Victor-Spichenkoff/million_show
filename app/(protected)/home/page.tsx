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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons/faTrophy";
import {HomeAdm} from "@/components/home/homeAdm";

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
        <div className="flex flex-col items-center text-2xl min-h-screen">
            {homeInfo ? (<>
                <div className={"max-w-[400px] px-4 lg:max-w-[var(--max_w)]  lg:w-full lg:flex flex-col bg-red-600"}>
                    <div className={"flex-1"}>
                        <Link href={"/leaderboard"} className={""}>
                            <div
                                className={"home-card flex mb-4 transition-all duration-200 hover:scale-105 w-full lg:flex-1"}>
                                <div className={"mr-4"}>
                                    <FontAwesomeIcon icon={faTrophy} size={"2xl"} color={"highlight"}/>
                                </div>
                                <div className={"flex-1"}>

                                    <p className={"home-box-title"}>Leaderboard</p>
                                    <p className={"home-box-value"}># {homeInfo.leaderBoardPosition}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={"home-action-large"}>
                        <div>
                            <HomeStatisticsArea homeInfos={homeInfo}/>
                        </div>
                        <div className={"home-action-area-container bg-sky-600"}>
                            <HomeAdm />
                            <HomeActionArea homeInfo={homeInfo}/>
                        </div>
                        <div className={"bg-emerald-600 w-full h-full home-historic-area-container"}>
                            Historic
                        </div>
                    </div>

                </div>

            </>) : <HomeSkeleton/>}
        </div>
    </>)
}
