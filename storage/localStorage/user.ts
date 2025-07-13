import {key_config, key_user} from "./storage_keys"

import {GetSafeType} from "@/storage/localStorage/getSageType"
import {LoginResponse} from "@/types/responses/auth";


export const GetUserStorage = () => {
    return GetSafeType<LoginResponse>("user")
}


export const UpdateUserStorage = (newThing: LoginResponse) => {
    localStorage.setItem(key_user, JSON.stringify(newThing))
}
