import {TestApiWorkService} from "@/services/apiConnection";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {getStoreLastUsedTime, storeLastUsedTime} from "@/storage/localStorage/apiConnection";
import {Button} from "@/components/ui/button";
import {Env} from "@/global";


interface IConnectionTest {
    setLockActions?: (s: boolean) => void
    isSilent?: boolean
}

let attempts = 0
/*
* setNavigationLock → true _> não navega para outras áreas
* */
export const ConnectionTest = ({setLockActions, isSilent}: IConnectionTest) => {
    const [errorToastId, setErrorToastId] = useState<string | number | null>(null)

    const handleCancel = () => {
        toast.dismiss(errorToastId ?? 1)
        toast.warning("Cancelled", {position: "top-left"})
        if (setLockActions)
            setLockActions(false)
    }

    const actionArea = (
        <div className={"flex gap-x-2 min-w-fit"}>
            <Button
                onClick={handleCancel}
                variant={"discreet"}
                className={"text-sm border-2 border-red-600 hover:bg-red-700 text-slate-800 " +
                    "dark:border-2 dark:border-red-600 dark:hover:bg-red-700 dark:text-gray-50"}
            >Cancel</Button>
        </div>
    )

    const handleTestAgainClick = async () => {
        if (attempts > 12) {
            toast.error("Server didn't started, sorry!", {position: "top-left"})
            return true
        }

        // dont need to load everytime
        const oldTime = getStoreLastUsedTime() ?? 1
        const now = Date.now()

        if (oldTime + 1000 * 60 * 10 > now) {
            return true
        }

        const res = await TestApiWorkService()
        if (res.isError)
            return false

        storeLastUsedTime(now)

        if (!isSilent)
            toast.info("Server is ready!", {position: "top-left"})

        console.log("GOOD TO GO")
        if (setLockActions)
            setLockActions(false)
        return true
    }

    const TryAgain = async () => {
        attempts++

        const success = await handleTestAgainClick()

        if (success) {
            toast.dismiss(errorToastId ?? 1)
            return
        }

        setTimeout(async () => {
            await TryAgain()
        }, 5000)
    }

    useEffect(() => {
        if (Env.isDevelopment()) {
            if (setLockActions)
                setLockActions(false)
            return
        }

        (async () => {
            const success = await handleTestAgainClick()

            if (success)
                return

            if (!isSilent) {
                const toastErrorID = toast.info("Server starting, please wait 1 minute...", {
                    position: "top-left",
                    action: actionArea,
                    duration: 60_000,
                })

                setErrorToastId(toastErrorID)
            }

            // recursive
            setTimeout(() => TryAgain(), 5000)
        })()
    }, [])

    return null
}
