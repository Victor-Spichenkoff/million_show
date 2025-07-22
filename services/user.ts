import {GetConfigStorage} from "@/storage/localStorage/config";
import {Question} from "@/types/responses/question";
import {globalCache} from "@/util/cache";
import {User} from "@/types/user";

export const loadCachedUser = () => {
    let user: User[] = []
    let page = 0

    while (true) {
        const cacheKeyPt = `user_page_${page}`

        if(globalCache.has(cacheKeyPt)) {
            const cachedQuestions: User[] = globalCache.get(cacheKeyPt)
            cachedQuestions.forEach(q => user.push(q))

        } else
            break

        page+=1
    }

    return { user, page }
}
