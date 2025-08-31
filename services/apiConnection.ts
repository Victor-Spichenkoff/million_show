import {handleApiCall} from "@/services/handleApiCall";

export const TestApiWorkService = async () => await handleApiCall({
    endpoint: "/teste",
    config: { timeout: 7_000 }
})
