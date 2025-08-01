import {globalCache} from "@/util/cache";

export const questionSearchQueryCacheKey = "cached_question_query"

export const saveQuestionSearchQuery = (q: string) => {
    globalCache.set(questionSearchQueryCacheKey, q)
}

export const getQuestionSearchQuery = () => globalCache.get(questionSearchQueryCacheKey) ?? ""


export const clearQuestionSearchQuery = () => globalCache.delete(questionSearchQueryCacheKey)
