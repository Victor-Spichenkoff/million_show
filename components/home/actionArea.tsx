import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {Match} from "@/types/responses/match";
import {toast} from "sonner";
import {UpdateHintStateStorage} from "@/storage/localStorage/match";
import {useRouter} from "next/navigation";
import {NewDialog} from "@/components/home/newDialog";
import {Button} from "@/components/ui/button";
import {HomeInfos} from "@/types/responses/home";
import {CacheIds, clearCache} from "@/util/cache";

interface IHomeActionArea {
    homeInfo: HomeInfos
}

export const HomeActionArea = ({homeInfo}:IHomeActionArea) => {
    const router = useRouter()

    const createMatch = useProtectedApiCall<Match>({
        endpoint: "/match/start",
        method: "post"
    })
    const createMatchForced = useProtectedApiCall<Match>({
        endpoint: "/match/start?force=true",
        method: "post"
    })


    const handleNewButton = async (e: any, force?: boolean) => {
        let result
        if (force)
            result = await createMatchForced()
        else
            result = await createMatch()

        if (result.isError)
            return toast.error("Can't create match")

        UpdateHintStateStorage("")
        clearCache(CacheIds.homeDashboard)
        router.push(`/match/${result.response.id}?isNew`)
    }

    // Handlers


    const handleContinueButton = () => {
        if (!homeInfo?.matchId)
            return toast.error("You don't have any started match")

        clearCache(CacheIds.homeDashboard)
        router.push(`/match/${homeInfo.matchId}`)
    }

    return (
        <div className={"flex flex-col gap-2 mt-4 lg:mt-0"}>
            {homeInfo.matchId ? (
                <NewDialog onClick={(e) => handleNewButton(e, true)}/>
            ) : (
                <Button variant={"gold"} onClick={handleNewButton}>New</Button>
            )}
            <Button onClick={handleContinueButton} disabled={!homeInfo.matchId}>Continue</Button>
        </div>
    )
}
