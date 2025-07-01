import {useGetQuestion} from "@/hooks/useGetQuestion"
import {Button} from "@/components/ui/button";
import {useState, useTransition} from "react";
import {MatchHint} from "@/types/hint";
import {Answers} from "@/components/match/answers";
import { CircularProgress } from '@mui/material';
import {Loading} from "@/components/template/loading";
import {UpdateHintStateStorage} from "@/storage/localStorage/match";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {toast} from "sonner";
import {StopDialog} from "@/components/match/stopDialog";
import {FinalScreenData} from "@/types/matchHelpersTypes";


interface IFullQuestion {
    hintState: MatchHint
    setFinalScreenData: (n: FinalScreenData) => void
}


export const FullQuestion = ({hintState, setFinalScreenData}: IFullQuestion) => {
    const {question, setQuestion} = useGetQuestion()
    const [selected, setSelected] = useState<number>(0)
    const [isLoading, startTransition] = useTransition()

    const stopMatchAction = useProtectedApiCall({
        endpoint: "/match/stop",
        method: "post"
    })

    if(!question)
        return <Loading />

    const handleAnswer = () => {
        //TODO: FINISH THIS
        console.log("JABf")
        UpdateHintStateStorage("")
    }

    const handleStop = () => {
        startTransition(async () => {
            const res = await stopMatchAction()
            if(res.isError) {
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

    return (<>
        <div className={"bg-question rounded-b-lg px-4 py-2 font-semibold font-roboto text-xl"}>
            {question?.label}
        </div>

        <Answers
            selected={selected}
            question={question}
            hintState={hintState}
            setSelected={setSelected}
        />


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
