import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Question} from "@/types/responses/question";

import {Controller, UseFormRegister, Control, useFormContext} from "react-hook-form";
import {answerIndexArray} from "@/lib/schema/edit";

interface QuestionForm {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answerIndex: number;
}

interface IAdmQuestionAnswerInput {
    index: 1 | 2 | 3 | 4;
    control: Control<QuestionForm>;
    register: UseFormRegister<QuestionForm>;
    setValue: (name: keyof QuestionForm, value: any) => void;
    getValues: () => QuestionForm;
}

export const AdmQuestionAnswerInput = ({
                                           index,
                                           control,
                                           register,
                                           setValue,
                                           getValues
                                       }: IAdmQuestionAnswerInput) => {
    const label = String.fromCharCode(64 + index) // 65 = 'A'

    const handleLetterClick = () => {
        setValue("answerIndex", answerIndexArray[index-1])
    }

    // const isSelected = answerIndexArray.indexOf(getValues().answerIndex as any) + 1 === index;

    const { watch } = useFormContext()
    const currentIndex = watch("answerIndex");
    const isSelected = answerIndexArray.indexOf(currentIndex) + 1 === index;

    return (
        <div
            className={`answer ${
                isSelected ? "font-bold border-highlight" : ""
            }`}
        >
            <div className="flex">
                <button
                    className="flex items-center"
                    type="button"
                    onClick={handleLetterClick}
                >
                    <div
                        className={`answer-letter mr-2 ${
                            isSelected ? "answer-letter-selected" : ""
                        }`}
                    >
                        {label}
                    </div>
                </button>

                <div className="flex-1 flex items-center">
                    <Controller
                        name={`option${index}` as `option1` | `option2` | `option3` | `option4`}
                        control={control}
                        render={({ field }) => (
                            <textarea
                                placeholder={`Option ${index}`}
                                {...field}
                                onInput={(e) => {
                                    e.currentTarget.style.height = "auto";
                                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                                }}
                                className="no-resize w-full bg-transparent resize-none overflow-hidden rounded-md"
                                rows={1}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
