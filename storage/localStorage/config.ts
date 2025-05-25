import { key_config, site_tag } from "./storage_keys"
import {ConfigStorage} from "@/types/storage/config";
import {GetSafeType} from "@/types/storage/generalStorage";


export const GetConfigStorage = () => {
    return GetSafeType<ConfigStorage>("config")
}


export const UpdateConfigStorage = (newThing: ConfigStorage) => {
    localStorage.setItem(key_config, JSON.stringify(newThing))
}
