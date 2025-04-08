
import { baseUrl } from "@/global"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios"
import { toast } from "sonner"


const handleApiCallWithCallBack = async <TReturn>
    (apiCall: () => Promise<AxiosResponse<TReturn>>): Promise<GenericApiResponse<TReturn>> => {

    try {
        const res = await apiCall()

        return {
            isError: false,
            response: res.data
        }
    } catch (e: unknown) {
        // tratar o erro conforme o backend
        if (isAxiosError(e) && typeof e.response?.data == "string")
            return {
                isError: true,
                errorMessage: `ERROR: ${e.response?.data}`
            }

        // erro generico
        return {
            isError: true,
            errorMessage: "Erro Inesperado!"
        }
    }

}


// essa reaproveita e usa o com callBack (auto-updated)
export const handleApiCall = async <TReturn, TBody = any>
    ({ endpoint, method = "get", body, fullUrl, config }: IHanleApiCall<TBody>): Promise<GenericApiResponse<TReturn>> => {

    //simula uma requi usando essas infos
    const query = async () => {
        let res;
        if (fullUrl)
            res = await axios[method](fullUrl, body, config)
        else
            res = await axios[method](baseUrl + endpoint, body, config)
        return res
    }

    return await handleApiCallWithCallBack(query)
}

// Retorna tudo normal, mas já dá um toast de erro
export const handleApiCallAndShowError = async <TReturn, TBody = any>
    ({ endpoint, method = "get", body, fullUrl }: IHanleApiCall): Promise<GenericApiResponse<TReturn>> => {

    // pode escolher qual das fn vai usar
    const res = await handleApiCall<TReturn, TBody>({
        endpoint, method, body, fullUrl
    })

    if (res.isError) {
        toast.error(res.errorMessage)

        return res
    }

    return res
}


// mostrar o erro apropriadamente no console:
const showErroOnConosle = (err: AxiosError, endpointOrUrl: string) => {
    console.log("Error at: ", endpointOrUrl)
    console.error(err)
}



// resposta padronizada
type GenericApiResponse<T> = {
    isError: false,
    response: T

} | {
    isError: true,
    errorMessage: string
}

// parametro de config para a api
type IHanleApiCall<TBody = any> = {
    fullUrl?: string
    endpoint: `/${string}`
    method?: "get" | "post" | "put" | "delete" | "patch"
    body?: TBody,// para poder ter auto complete nele se quiser
    config?: AxiosRequestConfig
}