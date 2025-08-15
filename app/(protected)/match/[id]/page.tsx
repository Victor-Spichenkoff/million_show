"use client"

import {Header} from "@/components/template/header";
import {Helps} from "@/components/match/helps";
import {FullQuestion} from "@/components/match/fullQuestion";
import {Match} from "@/types/responses/match";
import {useEffect, useState, useTransition} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {MatchHint} from "@/types/hint";
import {Loading} from "@/components/template/loading";
import {FinalScreenData} from "@/types/matchHelpersTypes";
import {FinalScreen} from "@/components/match/finalScreen";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Prizes} from "@/components/match/prizes";
import {ProgressBar} from "@/components/match/progressBar";
import {useGetQuestion} from "@/hooks/useGetQuestion";
import {CacheIds} from "@/util/cache";


export default function MatchPage() {
    const router = useRouter()
    const [isLoading, startTransition] = useTransition()
    const [hintState, setHintState] = useState<MatchHint>({type: "none"})
    const [matchState, setMatchState] = useState<Match | null>()
    const [finalScreenData, setFinalScreenData] = useState<FinalScreenData | null>(null)
    const {question, setQuestion, getQuestionOnApi} = useGetQuestion()

    const getMatchInfo = useProtectedApiCall<Match>({
        endpoint: "/match/status",
        cacheId: CacheIds.currentQuestionStatus
    })


    useEffect(() => {
        if (hintState.type != "none" || !matchState) {
            startTransition(getAndSetMatchInfo)
        } else
            getAndSetMatchInfo()
    }, [hintState])


    const getAndSetMatchInfo = async () => {
        if(finalScreenData) return

        const response = await getMatchInfo()
        if (!response.isError) {
            //TODO: PICTURE
            // response.response.questionIndex = 10
            // response.response.stopPrize = 100_000
            // response.response.wrongPrize = 50_000
            // response.response.nextPrize = 200_000
            setMatchState(response.response)
        }
        else {
            toast.error("You don't have any active match")
            router.push("/home")
        }
    }

    return (<>
        {isLoading && <Loading/>}
        <Header label={"Million Show"} showBackButton showConfig/>
        {finalScreenData ? (
            <div className={"h-full flex flex-col justify-center px-2 -mt-[95px]"}>
                <FinalScreen finalScreenData={finalScreenData}/>
            </div>
        ) : (
            <main
                className={"max-w-max_w mx-auto lg:flex items-center lg:items-center  lg:justify-around lg:flex-row-reverse h-full lg:-mt-[92px] px-8"}>
                <div className={`lg:flex-end lg:px-24`}>
                    <ProgressBar questionIndex={matchState?.questionIndex ?? 1}/>

                </div>
                <div
                    className={`mx-auto text-zinc-800 dark:text-white lg:w-full lg:flex-1 lg:flex lg:flex-row lg:justify-around`}>
                    <div className={`mx-auto max-w-max_w_question lg:flex-1 lg:max-w-[800px]`}>
                        <div className={"bg-question p-[.8px] rounded-tl-lg rounded-tr-lg overflow-hidden"}>
                            {matchState && (
                                <Helps
                                    getAndSetMatchInfo={getAndSetMatchInfo}
                                    setQuestion={setQuestion}
                                    getQuestionOnApi={getQuestionOnApi}
                                    setMatchHint={setHintState}
                                    match={matchState}
                                    hintState={hintState}
                                />
                            )}
                        </div>
                        <FullQuestion
                            question={question}
                            getQuestionOnApi={getQuestionOnApi}
                            getAndSetMatchInfo={getAndSetMatchInfo}
                            hintState={hintState}
                            setHintState={setHintState}
                            setFinalScreenData={setFinalScreenData}/>
                    </div>
                    <div className={"mx-auto max-w-max_w_question lg:px-12 "}>
                        <Prizes
                            stopPrize={matchState?.stopPrize}
                            nextPrize={matchState?.nextPrize}
                            wrongPrize={matchState?.wrongPrize}/>
                    </div>
                </div>

            </main>
        )}
    </>)
}
