import {GetSafeType} from "@/storage/localStorage/getSageType";
import {key_config, key_hint_state} from "@/storage/localStorage/storage_keys";
import {MatchHint} from "@/types/hint";

export const GetHintStateStorage = () => {
    return GetSafeType<MatchHint>("hint_state")
}


export const UpdateHintStateStorage = (newThing: MatchHint | string) => {
    if(typeof newThing === "string")
        return localStorage.setItem(key_hint_state, newThing)
    localStorage.setItem(key_hint_state, JSON.stringify(newThing))
}
