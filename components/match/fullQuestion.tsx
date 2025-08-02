import {FrontendQuestion} from "@/hooks/useGetQuestion"
import {Button} from "@/components/ui/button";
import { useEffect, useState, useTransition} from "react";
import {MatchHint} from "@/types/hint";
import {Answers} from "@/components/match/answers";
import {Loading} from "@/components/template/loading";
import { UpdateHintStateStorage} from "@/storage/localStorage/match";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {toast} from "sonner";
import {StopDialog} from "@/components/match/stopDialog";
import {FinalScreenData} from "@/types/matchHelpersTypes";
import {AnswerActionResponse} from "@/types/responses/match";
import {flashGold, flashGreen, flashRed, showConfetti} from "@/util/match";
import {motion, AnimatePresence} from "framer-motion"
import {QuestionSkeleton} from "@/components/match/questionSkeleton"
import {FLASH_ANIMATION_DURATION} from "@/global";
import {Sleep} from "@/helpers/time";
import {CacheIds, clearCache} from "@/util/cache";


interface IFullQuestion {
    hintState: MatchHint
    setHintState: (hintState: MatchHint) => void
    setFinalScreenData: (n: FinalScreenData) => void
    getAndSetMatchInfo: () => Promise<any>
    question: FrontendQuestion
    getQuestionOnApi: (isNew?: boolean) => Promise<void>
}


export const FullQuestion = ({
                                 hintState,
                                 setFinalScreenData,
                                 getAndSetMatchInfo,
                                 setHintState,
                                 getQuestionOnApi,
                                 question
                             }: IFullQuestion) => {

    const [selected, setSelected] = useState<number>(0)
    const [isLoading, startTransition] = useTransition()
    const [showSkeleton, setShowSkeleton] = useState<boolean>(false)
    const [isLoading2, setIsLoading2] = useState<boolean>(false)
    const [blockActions, setBlockActions] = useState(false)
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<null | number>(null)
    const [playerWrongAnswerIndex, setPlayerWrongAnswerIndex] = useState<null | number>(null)

    const stopMatchAction = useProtectedApiCall({
        endpoint: "/match/stop",
        method: "post"
    })

    const answerAction = useProtectedApiCall<AnswerActionResponse>({
        endpoint: `/match/answer/${selected}`,
        method: 'patch'
    })


    useEffect(() => {
        console.log("STATE")
        if(question == "loading")
            setShowSkeleton(true)
        else {
            setShowSkeleton(false)
        }
    }, [question])


    if (!question)
        return <Loading/>

    const handleAnswer = async () => {
        if (blockActions) return toast.error("Waiting...")

        setIsLoading2(true)
        const res = await answerAction()
        if (res.isError) {
            toast.error(res.errorMessage)
            return setIsLoading2(false)
        }

        setIsLoading2(false)
        setBlockActions(true)

        if (res.response.isCorrect && res.response.points) {// it's million
            flashGold()
            showConfetti()
            await Sleep(FLASH_ANIMATION_DURATION)
            setFinalScreenData({
                title: "Congratulations",
                subtitle: "You WON!!!",
                points: res.response.points,
                finalPrize: 1_000_000,
                isMillion: true,
            })
        } else if (res.response.isCorrect) { // normal correct
            setCorrectAnswerIndex(selected)
            flashGreen()
            await Sleep(FLASH_ANIMATION_DURATION * 2)
            await getNextQuestion()
            await getAndSetMatchInfo()
            resetStatesAfterAnswer()
        } else { // wrong
            flashRed()
            clearCache(CacheIds.homeDashboard)
            setCorrectAnswerIndex(res.response.correctAnswer)
            setPlayerWrongAnswerIndex(selected)
            await Sleep(FLASH_ANIMATION_DURATION * 2)
            setFinalScreenData({
                title: "Sorry",
                subtitle: "You Lost",
                finalPrize: res.response.finalPrize,
                points: res.response.points,
            })
        }
        setBlockActions(false)
        UpdateHintStateStorage("")
    }


    const handleStop = () => {
        startTransition(async () => {
            const res = await stopMatchAction()
            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }

            toast.success("You choose to stop")
            setFinalScreenData({
                title: "You decided to",
                subtitle: "STOP",
                finalPrize: res.response.finalPrize,
                points: res.response.points,
            })

            clearCache(CacheIds.homeDashboard)
            UpdateHintStateStorage("")
            setHintState({type: "none"})
        })
    }

    const getNextQuestion = async () => {
        setShowSkeleton(true)
        await getQuestionOnApi(true)
    }


    const resetStatesAfterAnswer = () => {
        setPlayerWrongAnswerIndex(null)
        setShowSkeleton(false)
        setCorrectAnswerIndex(null)
        setSelected(0)
        setHintState({type: "none"})
        UpdateHintStateStorage("")
    }


    return (<>
        {isLoading || isLoading2 && <Loading/>}
        <AnimatePresence mode="wait">
            {showSkeleton || question == "loading" ? (
                <motion.div
                    key="skeleton"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <QuestionSkeleton/>
                </motion.div>
            ) : (
                <motion.div
                    key={question?.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <div id={"question"}>
                        <div className={"bg-question rounded-b-lg px-4 py-2 font-semibold font-roboto text-xl"}>
                            {question?.label}
                        </div>

                        <Answers
                            selected={selected}
                            question={question}
                            hintState={hintState}
                            setSelected={setSelected}
                            correctAnswerIndex={correctAnswerIndex}
                            playerWrongAnswerIndex={playerWrongAnswerIndex}
                        />
                    </div>
                </motion.div>

            )}
        </AnimatePresence>

        <div className={"mt-3 gap-x-6 flex justify-around"}>
            <StopDialog onClick={handleStop}/>
            <Button
                className={"flex-1 "}
                variant={"gold"}
                disabled={selected == 0}
                onClick={handleAnswer}
            >Answer</Button>
        </div>
    </>)
}
