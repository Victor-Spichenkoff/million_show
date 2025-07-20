import {Question} from "@/types/responses/question";
import {globalCache} from "@/util/cache";
import {GetConfigStorage} from "@/storage/localStorage/config";

export const loadQuestionCachedQuestions = () => {
    const config = GetConfigStorage()
    let questions: Question[] = []
    let page = 0

    while (true) {
        const cacheKeyPt = `question_page_${page}_pt`
        const cacheKeyEn = `question_page_${page}_en`

        if(globalCache.has(cacheKeyPt)) {
            const cachedQuestions: Question[] = globalCache.get(cacheKeyPt)
            cachedQuestions.forEach(q => questions.push(q))
        } else if(globalCache.has(cacheKeyEn)) {
            const cachedQuestions: Question[] = globalCache.get(cacheKeyPt)
            cachedQuestions.forEach(q => questions.push(q))
        } else {
            break
        }
        page+=1
    }

    return { questions, page }
}
