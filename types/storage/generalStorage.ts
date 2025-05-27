"use client"

import {site_tag} from "@/storage/localStorage/storage_keys";

export type SelectableStore = "config"


export const ChangeStorage = <T>(tag:SelectableStore, newThing: T) => {
    const key = `${site_tag}_${tag}`
    localStorage.setItem(key, JSON.stringify(newThing))
}


