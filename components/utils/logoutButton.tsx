"use client"

import {logoutCookies} from "@/storage/cookie/auth";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

interface ILogoutButton {
    useFullSize?: boolean
}


export const LogoutButton = ({useFullSize}: ILogoutButton) => {
    const router = useRouter()

    const handleLogout = async () => {
        await logoutCookies()
        router.push('/auth')
    }

    return (
        <Button
            onClick={() =>handleLogout()}
            className={`text-white bg-red-600 hover:bg-red-800 " +
                "shadow-black/30 shadow-md ${useFullSize && "w-full"}`}
        >
            Logout
        </Button>)
}
