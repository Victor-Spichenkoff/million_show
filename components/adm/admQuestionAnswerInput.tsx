import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Question} from "@/types/responses/question";

interface IAdmQuestionAnswerInput {
    questData: Question
    setQuestData: Dispatch<SetStateAction<Question>>
    index: 1 | 2 | 3 | 4
}

export const AdmQuestionAnswerInput = ({setQuestData, questData, index}: IAdmQuestionAnswerInput) => {
    let label
    switch (index) {
        case 2:
            label = "B"
            break
        case 3:
            label = "C"
            break
        case 4:
            label = "D"
            break
        default:
            label = "A"
            break
    }

    const handleEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestData(prev => {
            prev[`option${index}`] = e.target.value
            return {...prev}
        })
    }

    return (
        <div className={`answer flex items-center gap-4 
            ${questData.answerIndex == index && " font-bold border-highlight"}`}>
            <div className={"bg-red-500 inline-block h-full flex items-center"}>

                <span
                    className={`answer-letter ${questData.answerIndex == index && "answer-letter-selected"}`}>{label}</span>
            </div>
            <div className={"flex-1 inline-block flex items-center"}>
                <textarea
                    className={`no-resize w-fit bg-transparent`}
                    name="option{}"
                    id={"answer" + index}
                    rows={1}
                    value={questData[`option${index}`]}
                    onChange={handleEdit}>

                </textarea>

            </div>
        </div>

    )
}
