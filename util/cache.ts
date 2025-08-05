import {User} from "@/types/user";

export const globalCache = new Map<string, any>()

export const clearAllCache = () => globalCache.clear()

export const clearCache = (id: string) => globalCache.delete(id)


/*
* * Structure: prefix[cont], e.g.: my_page_[cont]
* */
export const clearCacheForPrefix = (prefix: string) => {
    let c = 0
    while (true) {
        const id = `${prefix}${c}`
        if (globalCache.has(id))
            globalCache.delete(id)

        else
            break
    }
}

/*
* `${prefix}${number}${suffix}`
* prefix -> nhe_
* number -> 0 ...  (auto)
* suffix -> [_pt, _en...]
* */
export const clearCacheForSpecialSuffix = (prefix: string, suffix: string[]) => {
    let c = 0
    let isError = false
    while (!isError) {
        isError = true
        suffix.forEach((s) => {
            const id = `${prefix}${c}${s}`
            if (globalCache.has(id)) {
                globalCache.delete(id)
                isError = false
            }
        })
        c++
    }
}

/*
* id build -> [id][page]
* */
export const getPagedCache = <T>(id: string) => {
    let cachedData: T[] = []
    let page = 0

    while (true) {
        const cacheKeyPt = `${id}${page}`

        if (globalCache.has(cacheKeyPt)) {
            const cachedQuestions: T[] = globalCache.get(cacheKeyPt)
            cachedQuestions.forEach(q => cachedData.push(q))

        } else
            break

        page += 1
    }

    return {cachedData, page}

}

export enum CacheIds {
    homeDashboard = "1",
    playerInfos = "2",
    currentQuestion = "3"
}
