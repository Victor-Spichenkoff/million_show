import {Dispatch, SetStateAction, useState} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {User} from "@/types/user";
import {Controller, FormProvider, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {getAccessToken,} from "@/storage/cookie/auth";
import {EditUserSchema, roles} from "@/lib/schema/edit";
import {FormInput} from "@/components/auth/input";
import {clearCacheForPrefix} from "@/util/cache";
import {handleApiCall} from "@/services/handleApiCall";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {FormLabel} from "@/components/ui/form";
import {Question} from "@/types/responses/question";
import {AdmQuestionAnswerInput} from "@/components/adm/admQuestionAnswerInput";


interface IdmViewQuestion {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | Question) => void
    question: Question
    setGlobalIsLoading: Dispatch<SetStateAction<boolean>>
}

export const AdmEditQuestion = ({setMode, setEditionEntity, question, setGlobalIsLoading}: IdmViewQuestion) => {
    const [questData, setQuestData] = useState<Question>(question)

    if (!question)
        return null

    const updateQuestionAction = async () => {
        const token = await getAccessToken()

        return await handleApiCall({
            endpoint: `/question/${question.id}`,
            method: "patch",
            token: token?.value,
            body: {...questData},
        })
    }

    const form = useForm<Question>({
        defaultValues: {
            label: question.label,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            answerIndex: question.answerIndex,
            isBr: question.isBr,
            level: question.level
        },
    })


    const onSubmit = async () => {

        setGlobalIsLoading(true)

        const res = await updateQuestionAction()

        if (res.isError) {
            toast.error(res.errorMessage)
        } else {
            clearCacheForPrefix("question_page_")
            toast.success("Updated!")
            setEditionEntity(null)
            setMode("viewQuestions")
        }
        setGlobalIsLoading(false)
    }


    const handleCancel = () => {
        setEditionEntity(null)
        setMode("viewUsers")
    }


    return (
        <div className={"mx-auto w-full mt-10 flex flex-col item-center"}>
            <h2 className={"text-xl text-center mb-5"}>Editing question <span
                className={"text-gold text-2xl"}>{question.id}</span></h2>
            <FormProvider {...form}>
                <form onSubmit={onSubmit} className="space-y-7  mx-auto">

                    <div id={"question"}>
                        <textarea
                            className={"no-resize w-full bg-question rounded-lg px-4 py-2 font-semibold font-roboto text-xl"}>
                            {questData?.label}
                        </textarea>
                        <div className={"mt-3 space-y-1 rounded-lg"}>
                            <AdmQuestionAnswerInput
                                questData={questData}
                                setQuestData={setQuestData}
                                index={1}
                            />
                            <AdmQuestionAnswerInput
                                questData={questData}
                                setQuestData={setQuestData}
                                index={2}
                            />
                            <AdmQuestionAnswerInput
                                questData={questData}
                                setQuestData={setQuestData}
                                index={3}
                            />
                        </div>
                    </div>
                        {/* SELECT */}
                        <div className="flex flex-col gap-2">
                            <FormLabel htmlFor="role">User Type</FormLabel>
                            <Controller
                                name="role"
                                render={({field}) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            className="w-[180px] text-text border-text/20 placeholder:text-text/60">
                                            <SelectValue placeholder="Selecione um tipo"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((r) => (
                                                <SelectItem key={r} value={r}>
                                                    {r === "adm" ? "Administrator" : "User"}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>


                        <div className={"flex justify-between"}>
                            <Button onClick={handleCancel} variant={"error"}>Cancel</Button>
                            <Button type={"submit"} variant={"success"}>Update</Button>
                        </div>

                </form>
            </FormProvider>
        </div>
    )
}
