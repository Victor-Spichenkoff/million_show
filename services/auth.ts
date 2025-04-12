import { handleApiCallAndShowError} from "@/services/handleApiCall";
import {LoginResponse} from "@/types/responses/auth";

export const loginService = async (userName: string, password: string) => (
    await handleApiCallAndShowError<LoginResponse>({
    endpoint: "/auth/signin",
        body: { userName, password },
        method: "post"
})
)
