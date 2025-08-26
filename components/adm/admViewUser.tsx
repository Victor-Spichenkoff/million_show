import {AdmModes} from "@/app/(protected)/adm/page";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {AdmViewItem} from "@/components/adm/admViewItem";
import {toast} from "sonner";
import {Loading} from "@/components/template/loading";
import {Button} from "@/components/ui/button";
import {User} from "@/types/user";
import {GetUserStorage} from "@/storage/localStorage/user";
import {usePagination} from "@/hooks/global/usePagination";
import {pageSize} from "@/global";
import {loadCachedUser} from "@/services/user";

interface IAdmViewUser {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | User) => void
    setGlobalIsLoading: (n: boolean) => void
}


export const AdmViewUser = ({setMode, setEditionEntity, setGlobalIsLoading}: IAdmViewUser) => {
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const { pageItens: user, setPageItens: setUser, getMore, isAll, isLoading } = usePagination<User>({
        cacheFactory: (p) => `user_page_${p}`,
        urlFactory: p => `/user/paged?page=${p}`,
        cacheBaseId: "user_page",
        noAutoGetOnLoad: true
    })


    const deleteUserCall = useProtectedApiCall<string>({
        endpoint: `/user/${deleteId}`,
        method: "delete"
    })


    useEffect(() => {
        (async () => {
            setGlobalIsLoading(true)
            await getMore()
            setGlobalIsLoading(false)
        })()
    }, [])


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
                setUser(c => c.filter(c => c.id != deleteId))
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


    return (
        <div className={"max-w-max_w mx-auto flex flex-col justify-center lg:px-24 overflow-visible"}>
            <div className={"space-y-4 overflow-visible"}>
                {user.map((u, i) => (
                    <AdmViewItem
                        id={u.id}
                        key={i}
                        // key={u.id}
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
                <Button
                    onClick={getMore}
                    className={"mt-8 max-w-[150px] mx-auto"}>Load More</Button>
            )}
        </div>
    )
}
//no hook
// export const AdmViewUser = ({setMode, setEditionEntity, setGlobalIsLoading}: IAdmViewUser) => {
//     const [user, setUser] = useState<User[]>([])
//     const [deleteId, setDeleteId] = useState<number | null>(null)
//     const [page, setPage] = useState(0)
//     const [isLoading, setIsLoading] = useState(false)
//     const [isAll, setIsAll] = useState(false)
//
//     const getUsersCall = useProtectedApiCall<User[]>({
//         endpoint: `/user/paged?page=${page}`,
//         cacheId: `user_page_${page}`,
//         noAxiosCache: true,
//     })
//
//
//     const deleteUserCall = useProtectedApiCall<string>({
//         endpoint: `/user/${deleteId}`,
//         method: "delete"
//     })
//
//
//     const getUsers = async () => {
//         const res = await getUsersCall()
//
//         if (res.isError) {
//             toast.error(res.errorMessage)
//             return
//         }
//         if (res.response.length < pageSize)
//             setIsAll(true)
//
//         setUser([...user, ...res.response])
//         setPage(page + 1)
//     }
//
//
//     useEffect(() => {
//         const {user: cachedUsers, page: cachedPage} = loadCachedUser()
//         if (cachedPage > 0 && user?.length == 0) {
//             if(cachedUsers.length % pageSize != 0)
//                 setIsAll(true)
//
//             setPage(cachedPage)
//             setUser([...cachedUsers])
//             return
//         }
//
//
//         (async () => {
//             setGlobalIsLoading(true)
//             await getUsers()
//             setGlobalIsLoading(false)
//         })()
//     }, [])
//
//
//     // DELETE
//     useEffect(() => {
//         if (!deleteId)
//             return
//
//         (async () => {
//             setGlobalIsLoading(true)
//             const res = await deleteUserCall()
//
//             if (res.isError) {
//                 toast.error(res.errorMessage)
//             } else {
//                 toast.success(res.response)
//                 setUser(c => c.filter(c => c.id != deleteId))
//             }
//
//             setGlobalIsLoading(false)
//
//         })()
//
//     }, [deleteId])
//
//
//     const handleDelete = async (userId: number) => {
//         const user = GetUserStorage()
//         if (userId == user?.id)
//             return toast.error("You can't remove yourself")
//
//         setDeleteId(_ => userId)
//     }
//
//     const handleGetMore = async () => {
//         setIsLoading(true)
//         await getUsers()
//         setIsLoading(false)
//     }
//
//
//     return (
//         <div className={"max-w-max_w mx-auto flex flex-col justify-center lg:px-24 overflow-visible"}>
//             <div className={"space-y-4 overflow-visible"}>
//                 {user.map(u => (
//                     <AdmViewItem
//                         id={u.id}
//                         key={u.id}
//                         label={u.userName}
//                         extra={u.role == "adm" ? "ADM" : "USER"}
//                         setAdmModeAction={() => setMode("editUsers")}
//                         setEditionEntityAction={() => setEditionEntity(u)}
//                         handleDeleteAction={() => handleDelete(u.id)}
//                     />
//                 ))}
//             </div>
//
//             {isLoading && (
//                 <Loading isDisplayBlock size={35}/>
//             )}
//             {isAll && !isLoading && (
//                 <div className={"no-more-label"}>That's All</div>
//             )}
//
//             {!isAll && !isLoading && (
//                 <Button
//                     onClick={handleGetMore}
//                     className={"mt-8 max-w-[150px] mx-auto"}>Load More</Button>
//             )}
//         </div>
//     )
// }
