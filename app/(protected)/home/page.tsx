"use client"

import {Header} from "@/components/template/header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useEffect, useState} from "react";
import {HomeInfos} from "@/types/responses/home";
import {HomeSkeleton} from "@/components/home/homeSkeleton";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {HomeActionArea} from "@/components/home/actionArea";
import {HomeStatisticsArea} from "@/components/home/statisticsArea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons/faTrophy";
import {HomeAdm} from "@/components/home/homeAdm";
import {HistoricItems} from "@/components/template/homeHistoric";

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
        <div className="flex flex-col justify-center items-center text-2xl h-full lg:-mt-header-height bg-red-900">
            {homeInfo ? (<>
                <div
                    className={"max-w-[400px] px-4 lg:max-w-[var(--max_w)]  lg:w-full lg:flex flex-col"}>
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
                        <div className={"home-action-area-container"}>
                            <div className={"flex-1 mt-4 flex justify-center items-center"}>
                                <HomeAdm/>

                            </div>

                            <HomeActionArea homeInfo={homeInfo}/>
                        </div>
                        <div className={"w-full max-h-full home-historic-area-container mt-4 lg:mt-0"}>
                            <div className={"lg:max-h-[176px] truncate lg:pb-8"}>
                                {<HistoricItems historic={homeInfo.recentHistoric}/>}
                            </div>
                            <Button
                                className="mt-4 w-full font-bold py-2 rounded-lg transition">
                                View Full History
                            </Button>
                        </div>
                    </div>
                </div>
            </>) : <HomeSkeleton/>}
        </div>
    </>)
}
