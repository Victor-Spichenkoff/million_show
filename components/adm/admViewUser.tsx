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
import {GetUserStorage} from "@/storage/localStorage/user";

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
        cacheId: `user_page_${page}`,
        noAxiosCache: true,
    })


    const deleteUserCall = useProtectedApiCall<string>({
        endpoint: `/user/${deleteId}`,
        method: "delete"
    })


    const getUsers = async () => {
        const res = await getUsersCall()
        console.log(res)

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
        const {user: cachedQuestions, page: cachedPage} = loadCachedUser()
        if (cachedPage > 0 && user?.length == 0) {
            setPage(cachedPage)
            setQuestions([...cachedQuestions])
            return
        }

        console.log("GET page " + page);

        (async () => {
            setGlobalIsLoading(true)
            await getUsers()
            setGlobalIsLoading(false)
        })()
    }, [])


    // EDIT
    const handleEditClick = (user: User) => {
        setEditionEntity(user)
        setMode("editUsers")
        console.log("DONE")
    }


    // DELETE
    useEffect(() => {
        if (!deleteId)
            return

        (async () => {
            setGlobalIsLoading(true)
            const res = await deleteUserCall()

            if (res.isError) {
                toast.error(res.errorMessage)
            } else {
                toast.success(res.response)
                setQuestions(c => c.filter(c => c.id != deleteId))
            }

            setGlobalIsLoading(false)

        })()

    }, [deleteId])


    const handleDelete = async (userId: number) => {
        const user = GetUserStorage()
        if (userId == user?.id)
            return toast.error("You can't remove yourself")

        setDeleteId(_ => userId)
    }

    const handleGetMore = async () => {
        setIsLoading(true)
        await getUsers()
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
                        extra={u.role == "adm" ? "ADM" : "USER"}
                        setAdmModeAction={() => setMode("editUsers")}
                        setEditionEntityAction={() => setEditionEntity(u)}
                        handleDeleteAction={() => handleDelete(u.id)}
                    />
                ))}
            </div>

            {isLoading && (
                <Loading isDisplayBlock size={35}/>
            )}
            {isAll && !isLoading && (
                <div className={"no-more-label"}>That's All</div>
            )}

            {!isAll && !isLoading && (
                <Button onClick={handleGetMore}>More</Button>
            )}


        </div>
    )
}
