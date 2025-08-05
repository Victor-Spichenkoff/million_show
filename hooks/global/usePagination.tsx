import {useEffect, useState} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {pageSize} from "@/global";
import {getPagedCache} from "@/util/cache";

interface IUsePagination{
    urlFactory: (page: number) => `/${string}`
    cacheFactory: (page: number) => string
    cacheBaseId?: string
    take?: number
}


/*
* Page item will be
* */
export const usePagination = <TPageReturn,>({cacheBaseId, cacheFactory, urlFactory, take=pageSize}: IUsePagination) => {
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
        setIsLoading(true)
        const res = await call()
        setIsLoading(false)
        if(res.isError)
            return setError(res.errorMessage)

        setPageItens(prev => [...prev, ...res.response])
        setPage(prev => prev + 1)

        if(res.response.length % take != 0)
            setIsAll(true)
    }

    useEffect(() => {
        const {cachedData, page: cachedPage} = getPagedCache<TPageReturn>(cacheBaseId ?? "")
        if (cachedPage > 0 && pageItens?.length == 0) {
            if(cachedData.length % pageSize != 0)
                setIsAll(true)

            setPage(cachedPage)
            setPageItens([...cachedData])
            return
        }
        (async () => {
            getMore()
        })()

    }, [])

    return { isAll, error, pageItens, setPageItens, page, getMore, isLoading }
}
