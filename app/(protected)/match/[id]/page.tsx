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

export default function MatchPage() {
    const [isLoading, startTransition] = useTransition()
    const [hintState, setHintState] = useState<MatchHint>({ type: "none"})
    // const [hintState, setHintState] = useState<MatchHint>({ type: "univer",
    //     id: 64,
    //     option1: 12,
    //     option2: 2,
    //     option3: 50,
    //     option4: 50,
    // })
    // const [hintState, setHintState] = useState<MatchHint>({
    //     type: "half",
    //     "id": 158,
    //     "isBr": false,
    //     "label": "What do we use to eat soup?",
    //     "option1": "X",
    //     "option2": "Knife",
    //     "option3": "Spoon",
    //     "option4": "X",
    //     "level": 1
    // })

    const [matchState, setMatchState] = useState<Match | null>()

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
                <FullQuestion hintState={hintState}/>
            </div>
            {/* prizes */}
        </main>
    </>)
}
