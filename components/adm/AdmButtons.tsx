import {AdmModes} from "@/app/(protected)/adm/page";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";

interface IAdmChooseButtons {
    setMode:  Dispatch<SetStateAction<AdmModes>>
}

export const AdmChooseButtons = ({ setMode }: IAdmChooseButtons) => {
    const handleQuestionClick =  () => {
        setMode(c => {
            if(c == "none")
                return "editQuestions"
            return "none"
        })
    }

    const handleUserClick =  () => {
        setMode(c => {
            if(c == "none")
                return "editUsers"
            return "none"
        })
    }

    return (
        <div className={"flex justify-between max-w-max_w_question mx-auto"}>
            <Button onClick={handleUserClick}>Edit Users</Button>
            <Button onClick={handleQuestionClick}>Edit Questions</Button>
        </div>
    )
}
