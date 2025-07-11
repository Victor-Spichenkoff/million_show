import {handleApiCall, handleApiCallAndShowError} from "@/services/handleApiCall";
import {LoginResponse} from "@/types/responses/auth";

export const loginService = async (userName: string, password: string) => (
    await handleApiCall<LoginResponse>({
    endpoint: "/auth/signin",
        body: { userName, password },
        method: "post"
})
)

export const createService = async (userName: string, password: string) => (
    await handleApiCall<LoginResponse>({
        endpoint: "/auth/signup",
        body: { userName, password },
        method: "post"
    })
)

