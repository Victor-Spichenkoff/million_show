"use client"

import {useRouter} from "next/navigation";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {useEffect, useState} from "react";
import {toast} from "sonner";

export const useAdminOnly = () => {
    const router = useRouter()
    const checkPermission = useProtectedApiCall({ endpoint: "/auth/test/adm" })
    const [isUnlocked, setIsUnlocked] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await checkPermission()
            if(res.isError) {
                toast.error("ADMIN only content")
                return router.push("/home")
            }

            setIsUnlocked(true)
        })()
    }, [])

    return { isUnlocked }
}
