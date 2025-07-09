import {useGetQuestion} from "@/hooks/useGetQuestion"
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import {MatchHint} from "@/types/hint";
import {Answers} from "@/components/match/answers";
import {Loading} from "@/components/template/loading";
import {GetHintStateStorage, UpdateHintStateStorage} from "@/storage/localStorage/match";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {toast} from "sonner";
import {StopDialog} from "@/components/match/stopDialog";
import {FinalScreenData} from "@/types/matchHelpersTypes";
import {AnswerActionResponse} from "@/types/responses/match";
import {flashGold, flashGreen, flashRed, showConfetti} from "@/util/match";
import {GetConfigStorage} from "@/storage/localStorage/config";
import {Question} from "@/types/responses/question";
import {motion, AnimatePresence} from "framer-motion"
import {QuestionSkeleton} from "@/components/match/questionSkeleton"
import {FLASH_ANIMATION_DURATION} from "@/global";
import {GenericApiResponse} from "@/services/handleApiCall";

interface IFullQuestion {
    hintState: MatchHint
    setHintState: (hintState: MatchHint) => void
    setFinalScreenData: (n: FinalScreenData) => void
    getAndSetMatchInfo: () => Promise<any>
}


export const FullQuestion = ({hintState, setFinalScreenData, getAndSetMatchInfo, setHintState}: IFullQuestion) => {
    const {question, setQuestion, getQuestionOnApi} = useGetQuestion()
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

    const newQuestionAction = useProtectedApiCall<Question>({
        endpoint: `/match/next?isEn=${GetConfigStorage()?.isPortuguese ? "false" : "true"}`,
    })


    if (!question)
        return <Loading/>

    const handleAnswer = async () => {
        if(blockActions) return toast.error("Waiting...")

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
            await new Promise((resolve) => setTimeout(resolve, FLASH_ANIMATION_DURATION))
            setFinalScreenData({
                title:"Congratulations",
                subtitle: "You WON!!!",
                points: res.response.points,
                finalPrize: 1_000_000,
                isMillion: true,
            })
        } else if (res.response.isCorrect) { // normal correct
            setCorrectAnswerIndex(selected)
            flashGreen()
            await new Promise((resolve) => setTimeout(resolve, FLASH_ANIMATION_DURATION * 2))
            await getNextQuestion()
            await getAndSetMatchInfo()
            resetStatesAfterAnswer()
        } else { // wrong
            flashRed()
            setCorrectAnswerIndex(res.response.correctAnswer)
            setPlayerWrongAnswerIndex(selected)
            await new Promise((resolve) => setTimeout(resolve, FLASH_ANIMATION_DURATION * 2))
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

            UpdateHintStateStorage("")
            setHintState({type: "none"})
        })
    }

    const getNextQuestion = async () => {
        setShowSkeleton(true)
        // TODO: UNCOMMENT
        // const res = await newQuestionAction()
        // if (res.isError) {
        //     toast.error(res.errorMessage)
        //     return
        // }
        // setQuestion(res.response)

        await getQuestionOnApi(true)


        // await new Promise((resolve) => setTimeout(resolve, 2000))
        // setQuestion({
        //     "id": 133,
        //     "isBr": false,
        //     "label": "How many months are there in a year?",
        //     "option1": "10",
        //     "option2": "12",
        //     "option3": "11",
        //     "option4": "14",
        //     "level": 1
        // })
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
            {showSkeleton ? (
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
