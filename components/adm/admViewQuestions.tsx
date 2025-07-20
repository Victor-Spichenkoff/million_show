import {AdmModes} from "@/app/(protected)/adm/page";
import {Dispatch, SetStateAction, useCallback, useEffect, useState, useTransition} from "react";
import {Question} from "@/types/responses/question";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {AdmViewItem} from "@/components/adm/admViewItem";
import {toast} from "sonner";
import {Loading} from "@/components/template/loading";
import {Button} from "@/components/ui/button";
import {User} from "@/types/user";
import {pageSize} from "@/global";
import {handleApiCall} from "@/services/handleApiCall";
import {getAccessToken} from "@/storage/cookie/auth";
import {loadQuestionCachedQuestions} from "@/services/questions";
import {GetConfigStorage} from "@/storage/localStorage/config";

interface IAdmChooseButtons {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | Question | User) => void
    setGlobalIsLoading: (n: boolean) => void
}

export const AdmViewQuestions = ({setMode, setEditionEntity, setGlobalIsLoading}: IAdmChooseButtons) => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isAll, setIsAll] = useState(false)
    const config = GetConfigStorage()

    const getQuestionsCall = useProtectedApiCall<Question[]>({
        endpoint: `/question?page=${page}&isEn=${config?.isPortuguese ? "false":"true"}`,
        cacheId: `question_page_${page}_${config?.isPortuguese ? "pt" : "en"}`
    })

    // TODO
    //HOW TO IMPLEMENT IT? Will I need to create a hook
    // const deleteQuestionCall = async () =>  {
    //     return await handleApiCall<string>({
    //         endpoint: `/question/${deleteId}`,
    //         method: "delete",
    //         token: (await getAccessToken())?.value
    //     })
    // }

    const deleteQuestionCall = useProtectedApiCall<string>({
        endpoint: `/question/${deleteId}`,
        method: "delete"
    })


    const getQuestions = async () => {
        const res = await getQuestionsCall()

        if (res.isError) {
            toast.error(res.errorMessage)
            return
        }
        if (res.response.length < pageSize)
            setIsAll(true)

        setQuestions([...questions, ...res.response])
        setPage(p => p + 1)
    }


    useEffect(() => {
        const { questions: cachedQuestions, page: cachedPage }= loadQuestionCachedQuestions()
        if(cachedPage > 0 && questions.length == 0) {
            setPage(cachedPage)
            setQuestions([...cachedQuestions])
            return
        }

        (async () => {
            setGlobalIsLoading(true)
            await getQuestions()
            setGlobalIsLoading(false)
        })()
    }, [])


    // DELETE
    useEffect(() => {
        if (!deleteId)
            return

        (async () => {
            setGlobalIsLoading(true)
            const res = await deleteQuestionCall()

            if (res.isError) {
                toast.error(res.errorMessage)
            } else {
                toast.success(res.response)
                setQuestions(c => c.filter(c => c.id != deleteId))
            }

            setGlobalIsLoading(false)
        })()
    }, [deleteId])


    const handleDelete = async (questionId: number) => {
        setDeleteId(_ => questionId)
    }

    const handleGetMore = async () => {
        setIsLoading(true)
        await getQuestions()
        setIsLoading(false)
    }


    return (
        <div className={"max-w-max_w mx-auto flex flex-col justify-center lg:px-24 overflow-visible"}>
            <div className={"space-y-4 overflow-visible"}>
                {questions.map(q => (
                    <AdmViewItem
                        id={q.id}
                        key={q.id}
                        label={q.label}
                        extra={q[`option${q.answerIndex ?? 1}`]}
                        setAdmModeAction={() => setMode("editQuestions")}
                        setEditionEntityAction={() => setEditionEntity(q)}
                        handleDeleteAction={() => handleDelete(q.id)}
                    />
                ))}
            </div>

            {isLoading && (
                <Loading isDisplayBlock size={35}/>
            )}
            {isAll && !isLoading && (
                <div>that all</div>
            )}

            {!isAll && !isLoading && (
                <Button onClick={handleGetMore}>More</Button>
            )}


        </div>
    )
}
