export const globalCache = new Map<string, any>()


export const clearCache = (id: string) => globalCache.delete(id)


export enum CacheIds {
    homeDashboard = "1"
}
