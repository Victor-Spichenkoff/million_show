import { key_config, site_tag } from "./storage_keys"
import {ConfigStorage} from "@/types/storage/config";

import {GetSafeType} from "@/storage/localStorage/getSageType"


export const GetConfigStorage = () => {
    return GetSafeType<ConfigStorage>("config")
}


export const UpdateConfigStorage = (newThing: ConfigStorage) => {
    localStorage.setItem(key_config, JSON.stringify(newThing))
}
