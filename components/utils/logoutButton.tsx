"use client"

import {logout} from "@/storage/cookie/auth";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/auth/login')
    }

    return (
        <Button
            onClick={() =>handleLogout()}
            className={"bg-secondary text-white bg-red-600 hover:bg-red-800 " +
                "shadow-black/30 shadow-md"}
        >
            Logout
        </Button>)
}
