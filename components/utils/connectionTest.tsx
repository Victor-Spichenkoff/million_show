import {TestApiWorkService} from "@/services/apiConnection";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {getStoreLastUsedTime, storeLastUsedTime} from "@/storage/localStorage/apiConnection";
import {Button} from "@/components/ui/button";
import {Env} from "@/global";
import {useIsLogged} from "@/hooks/useIsLogged";


interface IConnectionTest {
    setLockActions?: (s: boolean) => void
    isSilent?: boolean
}


const toastIds = {
    starting: 1,
    notStarted: 2,
    started: 3,
    cancelled: 4
}

const clearAllToastsFromAutoLogin = (notClear?: number[]) => {
    Object.values(toastIds).forEach((toastId) => {
        if (!notClear?.includes(toastId))
            toast.dismiss(toastId)
    })
}


let attempts = 0
/*
* setNavigationLock → true _> não navega para outras áreas
* */
export const ConnectionTest = ({setLockActions, isSilent}: IConnectionTest) => {
    const isLogged = useIsLogged()

    const handleCancel = () => {
        toast.dismiss(toastIds.starting)
        toast.dismiss(toastIds.started)
        toast.warning("Cancelled", {position: "top-left", id: toastIds.cancelled})
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


    // LOGIC:
    useEffect(() => {
        if (Env.isDevelopment() && isLogged) {
            if (setLockActions)
                setLockActions(false)
            return
        }

        (async () => {
            const isStartDone = checkIfStartedRecently()

            if (!isSilent && !isStartDone) {
                toast.info("Server starting, please wait 1 minute...", {
                    position: "top-left",
                    action: actionArea,
                    duration: 180_000,
                    id: toastIds.starting
                })
            }

            const status = await handleTestAgain()

            if (status == "success" || status == "already_started_recently") {
                setLockActions && setLockActions(false)
                return
            }

            // recursive
            await tryAgain()
        })()

        return () => {
            toast.dismiss(toastIds.starting)
        }
    }, [])


    const handleTestAgain = async (): Promise<TestAgainStatus> => {
        // dont need to load everytime
        const isStartDone = checkIfStartedRecently()
        if(isStartDone)
            return "already_started_recently"

        attempts++
        if (attempts > 12) {
            toast.error("Server didn't started, sorry!", {position: "top-left", id: toastIds.notStarted})
            setLockActions && setLockActions(false)
            return "not_started"
        }

        const res = await TestApiWorkService()
        if (res.isError)
            return "try_again"


        storeLastUsedTime(Date.now())

        if (!isSilent)
            toast.info("Server is ready!", {position: "top-left", id: toastIds.started})

        if (setLockActions)
            setLockActions(false)
        return "success"
    }


    const tryAgain = async () => {
        const status = await handleTestAgain()

        if (status == "success" || status == "not_started") {
            toast.dismiss(toastIds.starting)
            toast.dismiss(toastIds.cancelled)
            if (status != "not_started")
                toast.dismiss(toastIds.notStarted)
            return
        } else if (status == "already_started_recently")
            return

        // status == "try_again":
        setTimeout(async () => {
            await tryAgain()
        }, 5000)
    }


    const checkIfStartedRecently = () => {
        const oldTime = getStoreLastUsedTime() ?? 1
        const now = Date.now()

        if (oldTime + 1000 * 60 * 10 > now && !Env.isDevOrTest()) {
            clearAllToastsFromAutoLogin()
            toast.info("Server is ready!", {position: "top-left", id: toastIds.started})
            return true
        }

        return false
    }


    return null
}


type TestAgainStatus = "success" | "not_started" | "try_again" | "already_started_recently"
