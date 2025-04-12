import {baseUrl} from "@/global"
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError} from "axios"
import {toast} from "sonner"


const handleApiCallWithCallBack = async <TReturn>
(apiCall: () => Promise<AxiosResponse<TReturn>>): Promise<GenericApiResponse<TReturn>> => {

    try {
        const res = await apiCall()

        return {
            isError: false,
            response: res.data
        }
    } catch (e: any) {
        console.log(e.status)
        if (isAxiosError(e) && (e.status == 401 || e.code == "UNAUTHORIZED")) {
            return {
                isError: true,
                errorMessage: `Please, login to access it`
            }
        }

        // tratar o erro conforme o backend
        if (isAxiosError(e) && typeof e.response?.data.message == "string")
            return {
                isError: true,
                errorMessage: `${e.response?.data.message}`
            }


        if (isAxiosError(e) && (e.code === 'ECONNABORTED' || e.message === 'Network Error' || !e.response))// made the request, but don't receive response
            return {
                isError: true,
                errorMessage: `Can't connect to server`
            }


        return {
            isError: true,
            errorMessage: "Unexpected error!"
        }
    }
}


// essa reaproveita e usa o com callBack (auto-updated)
export const handleApiCall = async <TReturn, TBody = any>
({
     endpoint,
     method = "get",
     body,
     fullUrl,
     config = {},
     token
 }: IHandleApiCall<TBody>): Promise<GenericApiResponse<TReturn>> => {

    if (token) {
        if (!config?.headers)
            config.headers = {}

        config.headers.Authorization = `Bearer ${token}`
    }


    //simula uma request usando essas infos
    const query = async () => {
        if (method == "get") {// he doesn't use body
            if (fullUrl)
                return await axios[method](fullUrl, config)
            else {
                return await axios[method](baseUrl + endpoint, config)
            }
        }
        // POST..., usam 3 args
        if (fullUrl)
            return await axios[method](fullUrl, body, config)
        else {
            return await axios[method](baseUrl + endpoint, body, config)
        }
    }

    return await handleApiCallWithCallBack(query)
}

// Retorna tudo normal, mas já dá um toast de erro
export const handleApiCallAndShowError = async <TReturn, TBody = any>
({endpoint, method = "get", body, fullUrl}: IHandleApiCall): Promise<GenericApiResponse<TReturn>> => {

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
export type GenericApiResponse<T> = {
    isError: false,
    response: T

} | {
    isError: true,
    errorMessage: string
}

// parametro de config para a api
export type IHandleApiCall<TBody = any> = {
    fullUrl?: string
    endpoint: `/${string}`
    method?: "get" | "post" | "put" | "delete" | "patch"
    body?: TBody,// para poder ter auto complete nele se quiser
    config?: AxiosRequestConfig
    token?: string
}
