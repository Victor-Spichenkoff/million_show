import {useGetQuestion} from "@/hooks/useGetQuestion"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {MatchHint} from "@/types/hint";
import {Answers} from "@/components/match/answers";
import { CircularProgress } from '@mui/material';
import {Loading} from "@/components/template/loading";
import {UpdateHintStateStorage} from "@/storage/localStorage/match";


interface IFullQuestion {
    hintState: MatchHint
}


export const FullQuestion = ({hintState}: IFullQuestion) => {
    const {question, setQuestion} = useGetQuestion()
    const [selected, setSelected] = useState<number>(0)

    if(!question)
        return <Loading />

    const handleAnswer = () => {
        //TODO: FINISH THIS
        UpdateHintStateStorage("")
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
            <Button
                className={"flex-1 "}
                variant={"gold"}
            >Stop</Button>
            <Button
                className={"flex-1 "}
                variant={"gold"}
                disabled={selected == 0}
                onClick={handleAnswer}
            >Answer</Button>
        </div>
    </>)
}
