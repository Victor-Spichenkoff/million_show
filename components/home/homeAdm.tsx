"use client"

import Link from "next/link"
import {GetUserStorage} from "@/storage/localStorage/user"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export const HomeAdm = () => {
    const isAdm = GetUserStorage()?.role == "adm"
    const router = useRouter()

    const handleClick = () => {
        if (isAdm)
            router.push("/adm")
    }


    return (
        <Button
            onClick={handleClick}
            className={`inline-block bg-success/80 text-white text-center py-8 w-full h-full lg:mb-8 rounded-lg
            shadow-md shadow-black/40
            ${isAdm && " hover:bg-success"}
            ${!isAdm && "hidden lg:inline-block"}
            `}
            disabled={!isAdm}>
                Administration
        </Button>
    )
}
