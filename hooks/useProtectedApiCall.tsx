import { handleApiCall, IHandleApiCall} from "@/services/handleApiCall";
import {getAccessToken, saveAccessToken} from "@/storage/cookie/auth";
import {usePathname, useRouter} from "next/navigation";
import {getLoginPathnameWithPreviousUrl} from "@/routes";


/**
 * Receive the config and are type-safe
 * If is not logged/expired, push to login, but keep previous url
 */
export const useProtectedApiCall = <TReturn = any, TBody = any>(config: IHandleApiCall<TBody>, autoShowError?: boolean) => {
    const router = useRouter()
    const pathname = usePathname()

    const execute = async () => {
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

        return res
    }


    return execute
}
