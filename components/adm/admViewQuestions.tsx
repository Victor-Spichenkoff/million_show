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

interface IAdmChooseButtons {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | Question | User) => void
    setGlobalIsLoading: (n: boolean) => void
}

export const AdmViewQuestions = ({setMode, setEditionEntity, setGlobalIsLoading}: IAdmChooseButtons) => {
    // const [questions, setQuestions] = useState<Question[]>([])
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [questions, setQuestions] = useState<Question[]>([
        {
            "id": 1,
            "isBr": true,
            "label": "Qual o idioma falado nos Estados Unidos",
            "option1": "Inglês",
            "option2": "Alemão",
            "option3": "Português",
            "option4": "Americano",
            "answerIndex": 1,
            "level": 1
        },
        {
            "id": 2,
            "isBr": true,
            "label": "Qual é o maior planeta do Sistema Solar?",
            "option1": "Júpiter",
            "option2": "Marte",
            "option3": "Terra",
            "option4": "Vênus",
            "answerIndex": 1,
            "level": 1
        },
        {
            "id": 3,
            "isBr": true,
            "label": "Quantos lados tem um triângulo?",
            "option1": "Quatro",
            "option2": "Três",
            "option3": "Cinco",
            "option4": "Seis",
            "answerIndex": 2,
            "level": 1
        },
        {
            "id": 4,
            "isBr": true,
            "label": "Quem pintou a Mona Lisa?",
            "option1": "Michelangelo",
            "option2": "Vincent van Gogh",
            "option3": "Leonardo da Vinci",
            "option4": "Pablo Picasso",
            "answerIndex": 3,
            "level": 1
        },
        {
            "id": 5,
            "isBr": true,
            "label": "Quantos dias tem um ano comum?",
            "option1": "364",
            "option2": "366",
            "option3": "365",
            "option4": "360",
            "answerIndex": 3,
            "level": 1
        },
        {
            "id": 6,
            "isBr": true,
            "label": "Qual é o metal presente no centro da Terra?",
            "option1": "Ouro",
            "option2": "Ferro",
            "option3": "Cobre",
            "option4": "Prata",
            "answerIndex": 2,
            "level": 1
        }
    ])
    const [page, setPage] = useState(0)
    const [isLoading, startTransition] = useTransition()
    const [isAll, setIsAll] = useState(false)

    const getQuestionsCall = useProtectedApiCall<Question[]>({
        endpoint: `/question?page=${page}`
    })

    // TODO
    //HOW TO IMPLEMENT IT? Will I need to create a hook
//     const deleteQuestionCall = async () =>  {
// console.log(        (await getAccessToken())?.value)
//
//         return await handleApiCall<string>({
//             endpoint: `/question/${deleteId}`,
//             method: "delete",
//             token: (await getAccessToken())?.value
//         })
//     }

    const deleteQuestionCall = useProtectedApiCall<string>({
        endpoint: `/question/${deleteId}`,
        method: "delete"

    })


    const getQuestions = () => {
        startTransition(async () => {
            const res = await getQuestionsCall()
            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }
            if (res.response.length < pageSize)
                setIsAll(true)

            setQuestions([...questions, ...res.response])
            setPage(p => p + 1)
        })
    }


    useEffect(() => {
        //TODO: UNCOMMENT
        // getQuestions()
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
                        // setAdmMode={setMode}
                        setEditionEntityAction={() => setEditionEntity(q)}
                        handleDeleteAction={() => handleDelete(q.id)}
                    />
                ))}
            </div>

            {isLoading && (
                <Loading isDisplayBlock/>
            )}
            {isAll && !isLoading && (
                <div>that all</div>
            )}

            {!isAll && !isLoading && (
                <Button onClick={getQuestions}>More</Button>
            )}


        </div>
    )
}
