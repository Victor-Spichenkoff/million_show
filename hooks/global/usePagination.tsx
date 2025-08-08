"use client"

import {useEffect, useState} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {pageSize} from "@/global";
import {getPagedCache} from "@/util/cache";

interface IUsePagination {
    urlFactory: (page: number) => `/${string}`
    cacheFactory: (page: number) => string
    cacheBaseId?: string
    take?: number
    noAutoGetOnLoad?: boolean
}


/*
* Page item will be
* */
export const usePagination = <TPageReturn,>({
                                                 noAutoGetOnLoad,
                                                 cacheBaseId,
                                                 cacheFactory,
                                                 urlFactory,
                                                 take = pageSize
                                             }: IUsePagination) => {
    const [page, setPage] = useState(0)
    const [pageItens, setPageItens] = useState<TPageReturn[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isAll, setIsAll] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const call = useProtectedApiCall<TPageReturn[] | null>({
        endpoint: urlFactory(page),
        cacheId: cacheFactory(page)
    })

    async function getMore() {
        if(isAll)
            return

        setIsLoading(true)
        const res = await call()
        setIsLoading(false)

        if (res.isError)
            return setError(res.errorMessage)

        setPageItens([...pageItens, ...res.response])
        setPage(page + 1)

            console.log(res.response.length, take)
        if (!res.response.length || res.response.length % take != 0) {
            console.log("IS ALL")
            setIsAll(true)
        }
    }

    useEffect(() => {
        if(cacheBaseId) {
            const {cachedData, page: cachedPage} = getPagedCache<TPageReturn>(cacheBaseId ?? "")
            if (cachedPage > 0 && pageItens?.length == 0) {
                if (cachedData.length % pageSize != 0)
                    setIsAll(true)

                setPage(cachedPage)
                setPageItens([...cachedData])
                return
            }
        }
        (async () => {
            if (!noAutoGetOnLoad)
                await getMore()
        })()

    }, [])

    return {isAll, error, pageItens, setPageItens,setIsAll, page, getMore, isLoading}
}



