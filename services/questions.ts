import {Question} from "@/types/responses/question";
import {globalCache} from "@/util/cache";

export const loadQuestionCachedQuestions = () => {
    let questions: Question[] = []
    let page = -1
    let isError = false
    let ptPage = 0
    let enPage = 0


    while (true) {
        const cacheKeyEn = `question_page_${enPage}_en`
        if (globalCache.has(cacheKeyEn)) {
            const cachedQuestions: Question[] = globalCache.get(cacheKeyEn)
            cachedQuestions.forEach(q => questions.push(q))
            isError = false
            enPage += 1
        } else
            break
    }

    while (true) {
        const cacheKeyPt = `question_page_${ptPage}_pt`
        if (globalCache.has(cacheKeyPt)) {
            const cachedQuestions: Question[] = globalCache.get(cacheKeyPt)
            cachedQuestions.forEach(q => questions.push(q))
            isError = false
            ptPage += 1
        } else
            break

    }

    // while (!isError) {
    //     isError = true
    //
    //
    //     const cacheKeyEn = `question_page_${enPage}_en`

    // if(globalCache.has(cacheKeyPt)) {
        //     const cachedQuestions: Question[] = globalCache.get(cacheKeyPt)
        //     cachedQuestions.forEach(q => questions.push(q))
        //     isError = false
        //     ptPage += 1
        // }
        // if(globalCache.has(cacheKeyEn)) {
        //     const cachedQuestions: Question[] = globalCache.get(cacheKeyEn)
        //     cachedQuestions.forEach(q => questions.push(q))
        //     isError = false
        //     enPage += 1
        // }
    // }

    return { questions, ptPage, enPage }
}
