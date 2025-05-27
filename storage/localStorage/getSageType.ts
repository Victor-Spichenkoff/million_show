import {site_tag} from "@/storage/localStorage/storage_keys";
import {SelectableStore} from "@/types/storage/generalStorage";

export const GetSafeType = <T>(tag: SelectableStore) => {
    if(typeof localStorage == "undefined") return null

    const key = `${site_tag}_${tag}`
    const storage = localStorage.getItem(key)
    if(!storage)
        return null
    try {
        const final:T = JSON.parse(storage)
        return final
    } catch {
        return null
    }
}
