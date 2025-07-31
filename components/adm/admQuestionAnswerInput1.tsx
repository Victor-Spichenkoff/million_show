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

  const handleLetterClick = () => {
        console.log("Letter clicked")
        setQuestData(prev => {
            prev.answerIndex=index
            return {...prev }
        })
    }

    return (
        <div className={`answer 
            ${questData.answerIndex == index && " font-bold border-highlight"}`}>

            <div className={"flex"}>

            <button className={"flex items-center"} type={"button"} onClick={handleLetterClick}>
                <div className={`answer-letter mr-2 ${questData.answerIndex == index && "answer-letter-selected"}`}>{label}</div>
            </button>

            <div className="flex-1 flex items-center">
                <textarea
                    onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    className="no-resize w-full bg-transparent resize-none overflow-hidden rounded-md"
                    name={`option${index}`}
                    id={`answer${index}`}
                    rows={1}
                    value={questData[`option${index}`]}
                    onChange={handleEdit}
                />
            </div>
            </div>
        </div>
        // <div className={`answer flex items-center gap-4
        //     ${questData.answerIndex == index && " font-bold border-highlight"}`}>
        //     <div className={"bg-red-500 inline-block h-full flex items-center"}>
        //         <span className={`answer-letter ${questData.answerIndex == index && "answer-letter-selected"}`}>{label}</span>
        //     </div>
        //     <div className={"flex-1 inline-block flex items-center bg-green-500 h-full"}>
        //         <textarea
        //             onInput={(e) => {
        //                 e.currentTarget.style.height = "auto";
        //                 e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        //             }}
        //             className={`no-resize h-auto w-fit bg-transparent bg-red-800`}
        //             name="option{}"
        //             id={"answer" + index}
        //             rows={1}
        //             value={questData[`option${index}`]}
        //             onChange={handleEdit}>
        //
        //         </textarea>
        //
        //     </div>
        // </div>

    )
}
