"use client"

import {Header} from "@/components/template/header";
import {Helps} from "@/components/match/helps";
import {FullQuestion} from "@/components/match/fullQuestion";
import {Match} from "@/types/responses/match";
import {useEffect, useState, useTransition} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {MatchHint} from "@/types/hint";
import {Loading} from "@/components/template/loading";
import {UpdateHintStateStorage} from "@/storage/localStorage/match";
import {FinalScreenData, FinalScreenDataTitle} from "@/types/matchHelpersTypes";
import {FinalScreen} from "@/components/match/finalScreen";

export default function MatchPage() {
    const [isLoading, startTransition] = useTransition()
    const [hintState, setHintState] = useState<MatchHint>({ type: "none"})
    const [matchState, setMatchState] = useState<Match | null>()
    //TODO: show locally the final prize screen, build a component for it
    // const [finalScreenData, setFinalScreenData] = useState<FinalScreenData | null>({
    //     subtitle: "STOP",
    //     title: "You decided to",
    //      finalPrize: 1_000_000
    // })
    const [finalScreenData, setFinalScreenData] = useState<FinalScreenData | null>(null)

    const getMatchInfo = useProtectedApiCall({endpoint: "/match/status"})


    useEffect(() => {
        startTransition(async () => {
            const response = await getMatchInfo()
            if (!response.isError)
                setMatchState(response.response)
        })
    }, [hintState])


    return (<>
        {isLoading && <Loading/>}
        <Header label={"Million Show"} showBackButton showConfig/>
        { finalScreenData ? (
            <div className={"h-full flex flex-col justify-center items-center"}>
                <FinalScreen finalScreenData={finalScreenData} />
            </div>
        ) : (
        <main className={"p-2"}>
            {/* bar */}
            <div className="max-w-[500px] mx-auto text-white">
                <div className={"bg-question p-[.8px] rounded-tl-lg rounded-tr-lg overflow-hidden"}>
                    {matchState && (
                        <Helps
                            setMatchHint={setHintState}
                            match={matchState}
                            hintState={hintState}
                        />
                    )}
                </div>
                <FullQuestion
                    hintState={hintState}
                    setFinalScreenData={setFinalScreenData}
                />
            </div>
            {/* prizes */}
        </main>
        )}
    </>)
}
