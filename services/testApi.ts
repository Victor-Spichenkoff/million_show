import { handleApiCall } from "./handleApiCall"

export const testApiService = async () => {
    return await handleApiCall<string>({
        endpoint: "/teste"
    })
}