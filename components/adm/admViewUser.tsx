import {AdmModes} from "@/app/(protected)/adm/page";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {AdmViewItem} from "@/components/adm/admViewItem";
import {toast} from "sonner";
import {Loading} from "@/components/template/loading";
import {Button} from "@/components/ui/button";
import {User} from "@/types/user";
import {pageSize} from "@/global";
import {loadCachedUser} from "@/services/user";

interface IAdmViewUser {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | User) => void
    setGlobalIsLoading: (n: boolean) => void
}

export const AdmViewUser = ({setMode, setEditionEntity, setGlobalIsLoading}: IAdmViewUser) => {
    const [user, setQuestions] = useState<User[]>([])
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isAll, setIsAll] = useState(false)

    const getUsersCall = useProtectedApiCall<User[]>({
        endpoint: `/user/paged?page=${page}`,
        cacheId: `user_page_${page}}`
    })

    const deleteQuestionCall = useProtectedApiCall<string>({
        endpoint: `/user/${deleteId}`,
        method: "delete"
    })


    const getQuestions = async () => {
        const res = await getUsersCall()

        if (res.isError) {
            toast.error(res.errorMessage)
            return
        }
        if (res.response.length < pageSize)
            setIsAll(true)

        setQuestions([...user, ...res.response])
        setPage(p => p + 1)
    }


    useEffect(() => {
        const { user: cachedQuestions, page: cachedPage }= loadCachedUser()
        if(cachedPage > 0 && user?.length == 0) {
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
                {user.map(u => (
                    <AdmViewItem
                        id={u.id}
                        key={u.id}
                        label={u.userName}
                        extra={u.role=="adm" ? "ADM" : "USER"}
                        setAdmModeAction={() => setMode("editQuestions")}
                        setEditionEntityAction={() => setEditionEntity(u)}
                        handleDeleteAction={() => handleDelete(u.id)}
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
