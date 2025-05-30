import {MatchHint} from "@/types/hint";
import {Question} from "@/types/responses/question";

interface IAnswers {
    question: Question
    hintState: MatchHint
    setSelected: (index: number) => void
    selected: number
}

export const Answers = ({question, hintState, selected, setSelected}: IAnswers) => {
    const handleOptionSelection = (index: number) => {
        if (index === selected)
            return setSelected(0)

        setSelected(index)
    }


    // if (hintState.type == null)
        return (
            <div className={"mt-3 space-y-1 rounded-lg"}>
                <div onClick={() => handleOptionSelection(1)}
                     className={`answer ${selected == 1 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 1 && "answer-letter-selected"}`}>A</span>
                    {question?.option1}
                </div>
                <div onClick={() => handleOptionSelection(2)}
                     className={`answer ${selected == 2 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 2 && "answer-letter-selected"}`}>B</span>
                    {question?.option2}
                </div>
                <div onClick={() => handleOptionSelection(3)}
                     className={`answer ${selected == 3 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 3 && "answer-letter-selected"}`}>C</span>
                    {question?.option3}
                </div>
                <div onClick={() => handleOptionSelection(4)}
                     className={`answer ${selected == 4 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 4 && "answer-letter-selected"}`}>D</span>
                    {question?.option4}
                </div>
            </div>

        )

}
