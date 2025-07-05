import {useGetQuestion} from "@/hooks/useGetQuestion"
import {Button} from "@/components/ui/button";
import {useEffect, useState, useTransition} from "react";
import {MatchHint} from "@/types/hint";
import {Answers} from "@/components/match/answers";
import {Loading} from "@/components/template/loading";
import {UpdateHintStateStorage} from "@/storage/localStorage/match";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {toast} from "sonner";
import {StopDialog} from "@/components/match/stopDialog";
import {FinalScreenData} from "@/types/matchHelpersTypes";
import {AnswerActionResponse} from "@/types/responses/match";
import {flashGreen, flashRed} from "@/util/match";
import {GetConfigStorage} from "@/storage/localStorage/config";
import {Question} from "@/types/responses/question";
import {motion, AnimatePresence} from "framer-motion"
import {QuestionSkeleton} from "@/components/match/questionSkeleton";
import {GenericApiResponse} from "@/services/handleApiCall";
import {FLASH_ANIMATION_DURATION} from "@/global";


interface IFullQuestion {
    hintState: MatchHint
    setFinalScreenData: (n: FinalScreenData) => void
}


export const FullQuestion = ({hintState, setFinalScreenData}: IFullQuestion) => {
    const {question, setQuestion} = useGetQuestion()
    const [selected, setSelected] = useState<number>(0)
    const [isLoading, startTransition] = useTransition()
    const [showSkeleton, setShowSkeleton] = useState<boolean>(false)
    const [isLoading2, setIsLoading2] = useState<boolean>(false)

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
        setIsLoading2(true)
        const res = await answerAction()
        if (res.isError) {
            toast.error(res.errorMessage)
            return setIsLoading2(false)
        }

        setIsLoading2(false)

        // TODO: IS MILLION
        if (res.response.isCorrect && res.response.points) {
            toast.success("MILÂOO")
        } else if (res.response.isCorrect) {
            flashGreen()
            await new Promise((resolve) => setTimeout(resolve, FLASH_ANIMATION_DURATION * 2))
            // fade and remove
            await getNextQuestion()
            setShowSkeleton(false)
        } else {
            flashRed()
        }
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

        await new Promise((resolve) => setTimeout(resolve, 2000))
        setQuestion({
            "id": 133,
            "isBr": false,
            "label": "How many months are there in a year?",
            "option1": "10",
            "option2": "12",
            "option3": "11",
            "option4": "14",
            "level": 1
        })
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
