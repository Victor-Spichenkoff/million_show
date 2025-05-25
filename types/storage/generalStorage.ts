import {site_tag} from "@/storage/localStorage/storage_keys";

export type SelectableStore = "config"


export const ChangeStorage = <T>(tag:SelectableStore, newThing: T) => {
    const key = `${site_tag}_${tag}`
    localStorage.setItem(key, JSON.stringify(newThing))
}


export const GetSafeType = <T>(tag: SelectableStore) => {
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
