import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {toast} from "sonner";
import {getAccessToken,} from "@/storage/cookie/auth";
import {
    answerIndexArray,
    EditOrCreateQuestionSchema,
    EditOrCreateUserSchema,
    levelArray,
    roles
} from "@/lib/schema/edit";
import {clearCacheForPrefix, clearCacheForSpecialSuffix} from "@/util/cache";
import {handleApiCall} from "@/services/handleApiCall";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {FormLabel} from "@/components/ui/form";
import {Question} from "@/types/responses/question";
import {AdmQuestionAnswerInput} from "@/components/adm/admQuestionAnswerInput";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


const optionsLetter = [
    "A",
    "B",
    "C",
    "D"
]


interface IdmViewQuestion {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | Question) => void
    question: Question
    setGlobalIsLoading: Dispatch<SetStateAction<boolean>>
    isAdd?: boolean
}

export const AdmEditQuestion = ({isAdd, setMode, setEditionEntity, question, setGlobalIsLoading}: IdmViewQuestion) => {
    const [questData, setQuestData] = useState<Question>(question)

    if (!question)
        return null

    const updateQuestionAction = async (questionData: Question) => {
        const token = await getAccessToken()

        return await handleApiCall({
            endpoint: `/question/${question.id}`,
            method: "patch",
            token: token?.value,
            body: {...questionData},
        })
    }

    const createQuestionAction = async (questionData: Question) => {
        const token = await getAccessToken()

        return await handleApiCall<Question>({
            endpoint: `/question`,
            method: "post",
            token: token?.value,
            body: {...questionData},
        })
    }


    const form = useForm<z.infer<typeof EditOrCreateQuestionSchema>>({
        defaultValues: {
            label: question.label,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            answerIndex: answerIndexArray[Number(question.answerIndex) - 1],
            isBr: question.isBr,
            level: levelArray[question.level - 1]
        },
    })


    const onSubmit = async (values: z.infer<typeof EditOrCreateQuestionSchema>) => {

        setGlobalIsLoading(true)

        values.answerIndex = answerIndexArray.indexOf(values.answerIndex) + 1 as any
        values.level = levelArray.indexOf(values.level) + 1 as any

        // console.log(values)
        let res
        if(isAdd)
            res = await createQuestionAction(values as any)
        else
            res = await updateQuestionAction(values as any)


        if (res.isError) {
            toast.error(res.errorMessage)
        } else {
            clearCacheForSpecialSuffix("question_page_", ["_pt", "_en"])
            toast.success(isAdd ? `Created question ${(res.response as any)?.id}` : "Updated!")
            setEditionEntity(null)
            setMode("viewQuestions")
        }
        setGlobalIsLoading(false)
    }


    const handleCancel = () => {
        setEditionEntity(null)
        setMode("viewUsers")
    }

    const handleLabelEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestData(prev => {
            prev.label = e.target.value
            return {...prev}
        })
    }


    return (
        <div className={"mx-auto w-full mt-10 flex flex-col item-center"}>
            {isAdd ? (
                <h2 className={"text-xl text-center mb-5"}>Creating question</h2>
            ) : (
                <h2 className={"text-xl text-center mb-5"}>Editing question <span
                    className={"text-gold text-2xl"}>{question.id}</span></h2>
            )}

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full max-w-max_w_question mx-auto">

                    {/*Question Simulator*/}
                    <div id={"question"}>
                        <div className={"bg-question px-4 rounded-lg py-2"}>
                            <Controller
                                name="label"
                                control={form.control}
                                render={({field}) => (
                                    <textarea
                                        {...field}
                                        placeholder={"Question"}
                                        onInput={(e) => {
                                            e.currentTarget.style.height = "auto";
                                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                                        }}
                                        className={"no-resize w-full h-auto bg-question rounded-lg px-4 py-2 font-semibold font-roboto text-xl"}/>

                                )}
                            />

                        </div>
                        <div className={"mt-3 space-y-1 rounded-lg"}>
                            <AdmQuestionAnswerInput
                                index={1}
                                control={form.control as any}
                                register={form.register as any}
                                setValue={form.setValue as any}
                                getValues={form.getValues as any}
                            />
                            <AdmQuestionAnswerInput
                                index={2}
                                control={form.control as any}
                                register={form.register as any}
                                setValue={form.setValue as any}
                                getValues={form.getValues as any}
                            />
                            <AdmQuestionAnswerInput
                                index={3}
                                control={form.control as any}
                                register={form.register as any}
                                setValue={form.setValue as any}
                                getValues={form.getValues as any}
                            />
                            <AdmQuestionAnswerInput
                                index={4}
                                control={form.control as any}
                                register={form.register as any}
                                setValue={form.setValue as any}
                                getValues={form.getValues as any}
                            />
                        </div>
                    </div>

                    {/* SELECTS */}
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="answerIndex">Question Answer</FormLabel>
                        <Controller
                            name="answerIndex"
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className="w-[180px] text-text border-text/20 placeholder:text-text/60">
                                        <SelectValue placeholder="Select answer"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {answerIndexArray.map((aI) => (
                                            <SelectItem key={aI} value={aI}>
                                                {aI}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="level">Question Level</FormLabel>
                        <Controller
                            name="level"
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className="w-[180px] text-text border-text/20 placeholder:text-text/60">
                                        <SelectValue placeholder="Select a level"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {levelArray.map((l) => (
                                            <SelectItem key={l} value={l}>
                                                {l}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/*Check*/}
                    <Controller
                        name={"isBr"}
                        control={form.control}
                        render={({field}) => (
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    checked={field.value}
                                    onChange={e => field.onChange(e.target.checked)} // needed it for checkbox
                                    // onBlur={field.onBlur}
                                    // ref={field.ref}
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border border-gray-400 rounded-sm checked:bg-sky-800 checked:border-transparent checked:before:content-['✓'] checked:before:text-white checked:before:block checked:before:text-center"
                                />
                                <span className={`${!field.value && "opacity-65"}`}>Portuguese</span>
                            </label>
                        )}/>


                    <div className={"flex justify-between"}>
                        <Button onClick={handleCancel} variant={"error"}>Cancel</Button>
                        <Button type={"submit"} variant={"success"}>{isAdd ? "Create" : "Update"}</Button>
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}
