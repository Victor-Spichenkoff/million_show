export const globalCache = new Map<string, any>()


export const clearCache = (id: string) => globalCache.delete(id)


/*
* * Structure: prefix[cont], e.g.: my_page_[cont]
* */
export const clearCacheForPrefix = (prefix: string) => {
    let c = 0
    while (true) {
        const id = `${prefix}${c}`
        if(globalCache.has(id))
            globalCache.delete(id)
        else
            break
    }
}

export enum CacheIds {
    homeDashboard = "1"
}
