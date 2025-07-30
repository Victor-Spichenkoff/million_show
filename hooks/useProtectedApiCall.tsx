import { handleApiCall, IHandleApiCall} from "@/services/handleApiCall"
import {getAccessToken, saveAccessToken} from "@/storage/cookie/auth"
import {usePathname, useRouter} from "next/navigation"
import {getLoginPathnameWithPreviousUrl} from "@/routes"
import {globalCache} from "@/util/cache";

/**
 * Receive the config and are type-safe
 * If is not logged/expired, push to log in screen, but keep previous url
 */
export const useProtectedApiCall = <TReturn = any, TBody = any>(config: IHandleApiCall<TBody>, autoShowError?: boolean) => {
    const router = useRouter()
    const pathname = usePathname()


    return async () => {
        const cacheKey = config.cacheId
        if (cacheKey && globalCache.has(cacheKey)) {
            console.log(globalCache.has(cacheKey))
            return { isError: false, response: globalCache.get(cacheKey), errorMessage: null }
        }

        const token = await getAccessToken()

        if (!token)
            router.replace("")

        const res = await handleApiCall<TReturn>({
            ...config,
            token: token?.value,
        })

        if (res.isError && res.errorMessage.toLowerCase().includes("login")) {
            router.replace(getLoginPathnameWithPreviousUrl(pathname))
        }

        //save on cache
        if(cacheKey && !res.isError)
            globalCache.set(cacheKey, res.response)

        return res
    }
}
