import {Question} from "@/types/responses/question";
import {globalCache} from "@/util/cache";
import {GetConfigStorage} from "@/storage/localStorage/config";

export const loadQuestionCachedQuestions = () => {
    let questions: Question[] = []
    let page = -1
    let isError = false

    while (!isError) {
        page+=1
        isError = true

        const cacheKeyPt = `question_page_${page}_pt`
        const cacheKeyEn = `question_page_${page}_en`

        console.log(cacheKeyPt)
        if(globalCache.has(cacheKeyPt)) {
            const cachedQuestions: Question[] = globalCache.get(cacheKeyPt)
            cachedQuestions.forEach(q => questions.push(q))
            isError = false
        }
        if(globalCache.has(cacheKeyEn)) {
            const cachedQuestions: Question[] = globalCache.get(cacheKeyEn)
            cachedQuestions.forEach(q => questions.push(q))
            isError = false
        }
    }

    return { questions, page }
}
