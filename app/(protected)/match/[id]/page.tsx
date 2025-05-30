"use client"

import {Header} from "@/components/template/header";
import {Helps} from "@/components/match/helps";
import {FullQuestion} from "@/components/match/fullQuestion";
import {Match} from "@/types/responses/match";
import {useEffect, useState} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {MatchHint} from "@/types/hint";
import {Loading} from "@/components/template/loading";

export default function MatchPage() {
    const [hintState, setHintState] = useState<MatchHint>({ type: "none" })
    const [matchState, setMatchState] = useState<Match | null>()

    const getMatchInfo = useProtectedApiCall({endpoint: "/match/status"})

    useEffect(() => {
        (async () => {
            const response = await getMatchInfo()
            if(!response.isError)
                setMatchState(response.response)
        })()
    }, [hintState])

    if(!matchState)
        return <Loading />

    return (<>
        <Header label={"Million Show"} showBackButton showConfig/>
        <main className={"p-2"}>
            {/* bar */}
            <div className="max-w-[500px] mx-auto text-white rounded-lg">
                <div className={"bg-question p-[.8px] rounded-lg"}>
                    <Helps
                        setMatchHint={setHintState}
                        match={matchState}
                    />
                </div>
                <FullQuestion hintState={hintState} />
            </div>
            {/* prizes */}
        </main>
    </>)
}
