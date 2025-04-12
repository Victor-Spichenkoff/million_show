import {GenericApiResponse, handleApiCall, IHandleApiCall} from "@/services/handleApiCall";
import {getAccessToken} from "@/storage/cookie/auth";
import {usePathname, useRouter} from "next/navigation";
import {getLoginPathnameWithPreviousUrl} from "@/routes";


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
