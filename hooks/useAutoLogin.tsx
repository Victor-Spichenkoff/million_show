import {createService, loginService} from "@/services/auth";
import {saveAccessToken, saveExpiresAt} from "@/storage/cookie/auth";

// export const autoLoginUserName = "cool_person"
// export const autoLoginUserPassword = "12345"
export const autoLoginUserName = "string"
export const autoLoginUserPassword = "1234"


export const useAutoLogin = () => {
    const login = async () => {
        const res = await loginService(autoLoginUserName, autoLoginUserPassword)

        if (res.isError) {
            console.log("LOGIN ERROR: " + res.errorMessage)
            return false
        }

        const now = new Date()
        const expiresAt = new Date(now.getTime() + res.response.expires_in * 1000)

        await saveAccessToken(res.response.access_token, expiresAt)
        await saveExpiresAt(expiresAt)

        return true
    }


    const createAndLogin = async () => {
        const res = await createService(autoLoginUserName, autoLoginUserPassword)

        if (res.isError) {
            console.log("CREATE ERROR: " + res.errorMessage)
            return false
        }

        const now = new Date()
        const expiresAt = new Date(now.getTime() + res.response.expires_in * 1000)

        await saveAccessToken(res.response.access_token, expiresAt)
        await saveExpiresAt(expiresAt)

        return true
    }

    return { login, createAndLogin }
}
