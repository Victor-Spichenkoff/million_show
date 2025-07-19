import {Question} from "@/types/responses/question";
import {globalCache} from "@/util/cache";

export const loadQuestionCachedQuestions = () => {
    let questions: Question[] = []
    let page = 0
    while (true) {
        const cacheKey = `question_page_${page}`
        if(globalCache.has(cacheKey)) {
            const q = globalCache.get(cacheKey)
            questions.push(q)
        }
        else
            break
        page+=1
    }

    questions.forEach(q => console.log(q.label))
    return { questions, page }
}
