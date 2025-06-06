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


    if (hintState.type == "none")
        return (
            <div className={"mt-3 space-y-1 rounded-lg"}>
                <button onClick={() => handleOptionSelection(1)}
                        className={`answer ${selected == 1 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 1 && "answer-letter-selected"}`}>A</span>
                    {question?.option1}
                </button>
                <button onClick={() => handleOptionSelection(2)}
                        className={`answer ${selected == 2 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 2 && "answer-letter-selected"}`}>B</span>
                    {question?.option2}
                </button>
                <button onClick={() => handleOptionSelection(3)}
                        className={`answer ${selected == 3 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 3 && "answer-letter-selected"}`}>C</span>
                    {question?.option3}
                </button>
                <button onClick={() => handleOptionSelection(4)}
                        className={`answer ${selected == 4 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 4 && "answer-letter-selected"}`}>D</span>
                    {question?.option4}
                </button>
            </div>
        )

    else if (hintState.type == "univer")
        return (
            <div className={"mt-3 space-y-1 rounded-lg"}>
                <button onClick={() => handleOptionSelection(1)}
                        className={`answer ${selected == 1 && "font-bold border-highlight"}`}
                        style={{opacity: (hintState.option1 + 30) / 100}}
                >
                    <span className={`answer-letter ${selected == 1 && "answer-letter-selected"}`}>A</span>
                    {question?.option1}
                    <span
                        className={`text-md float-right self-center `}
                    >
                        {hintState.option1}
                    </span>
                </button>

                <button onClick={() => handleOptionSelection(2)}
                        className={`answer ${selected == 2 && "font-bold border-highlight"}`}
                        style={{opacity: (hintState.option2 + 30) / 100}}
                >
                    <span className={`answer-letter ${selected == 2 && "answer-letter-selected"}`}>B</span>
                    {question?.option2}
                    <span
                        className={`text-md float-right self-center `}
                    >
                        {hintState.option2}
                    </span>
                </button>

                <button onClick={() => handleOptionSelection(3)}
                        className={`answer ${selected == 3 && "font-bold border-highlight"}`}
                        style={{opacity: (hintState.option3 + 30) / 100}}
                >
                    <span className={`answer-letter ${selected == 3 && "answer-letter-selected"}`}>C</span>
                    {question?.option3}
                    <span
                        className={`text-md float-right self-center `}
                    >
                        {hintState.option3}
                    </span>
                </button>

                <button onClick={() => handleOptionSelection(4)}
                        className={`answer ${selected == 4 && "font-bold border-highlight"}`}
                        style={{opacity: (hintState.option4 + 30) / 100}}>
                    <span className={`answer-letter ${selected == 4 && "answer-letter-selected"}`}>D</span>
                    {question?.option4}
                    <span
                        className={`text-md float-right self-center `}
                    >
                        {hintState.option4}
                    </span>
                </button>
            </div>
        )

    else if (hintState.type == "half")
        return (
            <div className={"mt-3 space-y-1 rounded-lg"}>
                <button
                    disabled={hintState.option1.toLowerCase().includes("x")}
                    onClick={() => handleOptionSelection(1)}
                    className={`answer ${hintState.option1.toLowerCase().includes("x") && "removed"} ${selected == 1 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 1 && "answer-letter-selected"}`}>A</span>
                    {hintState?.option1}
                </button>
                <button
                    disabled={hintState.option2.toLowerCase().includes("x")}
                    onClick={() => handleOptionSelection(2)}
                    className={`answer ${hintState.option2.toLowerCase().includes("x") && "removed"} ${selected == 2 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 2 && "answer-letter-selected"}`}>B</span>
                    {hintState?.option2}
                </button>
                <button
                    disabled={hintState.option3.toLowerCase().includes("x")}
                    onClick={() => handleOptionSelection(3)}
                    className={`answer ${hintState.option3.toLowerCase().includes("x") && "removed"} ${selected == 3 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 3 && "answer-letter-selected"}`}>C</span>
                    {hintState?.option3}
                </button>
                <button
                    disabled={hintState.option4.toLowerCase().includes("x")}
                    onClick={() => handleOptionSelection(4)}
                    className={`answer ${hintState.option4.toLowerCase().includes("x") && "removed"} ${selected == 4 && "font-bold border-highlight"}`}>
                    <span className={`answer-letter ${selected == 4 && "answer-letter-selected"}`}>D</span>
                    {hintState?.option4}
                </button>
            </div>
        )

}
