import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLightbulb, faArrowRotateForward, faUser} from "@fortawesome/free-solid-svg-icons";
import {MatchHint} from "@/types/hint";
import {Match} from "@/types/responses/match";
import {useEffect, useTransition} from "react";
import {GetHintStateStorage, UpdateHintStateStorage} from "@/storage/localStorage/match";
import {toast} from "sonner";
import {handleApiCallAndShowError} from "@/services/handleApiCall";
import {UniverHint} from "@/types/responses/hint";
import {Loading} from "@/components/template/loading";
import {getAccessToken} from "@/storage/cookie/auth";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";


interface IHelps {
    setMatchHint: (x: MatchHint) => void
    match: Match
    hintState: MatchHint
}

export const Helps = ({setMatchHint, match, hintState}: IHelps) => {
    const [isLoading, startTransition] = useTransition()
    const getUniverHelp = useProtectedApiCall<UniverHint>({
        endpoint: "/hint/universitary"
    })

    useEffect(() => {
        const storageHint = GetHintStateStorage()

        if (storageHint?.type != "none" && storageHint) {
            setMatchHint(storageHint)
        }
    }, [])

    const handleGetUniverHelp = async () => {
        if (hintState && hintState.type != "none")
            return toast.warning("You already got helped")

        startTransition(async () => {
            const token = await getAccessToken()
            const res = await getUniverHelp()

            if (!res.isError) {
                UpdateHintStateStorage({...res.response, type: "univer"})
                setMatchHint({...res.response, type: "univer"})
            }
        })
    }


    return (
        <div className={"flex justify-around bg-hint border-b border-question-border border-collapse" +
            " rounded-tl-lg rounded-tr-lg relative"}>
            {isLoading && <Loading/>}
            <button className={"hint-box"}>
                <div><FontAwesomeIcon icon={faLightbulb} className={"text-yellow-500"}/> 50/50</div>
                <span className={"text-gold"}>X{match.halfHalf}</span>
            </button>
            <div className={"h-[80%] w-[.5px] bg-white absolute left-[33%] top-[50%] translate-y-[-50%]"}></div>
            <button className={"hint-box"}>
                <div><FontAwesomeIcon icon={faArrowRotateForward} className={"text-gold"}/> Skip</div>
                <span className={"text-gold"}>X{match.skips}</span>
            </button>
            <div className={"h-[80%] w-[.5px] bg-white absolute left-[66%] top-[50%] translate-y-[-50%]"}></div>
            <button className={"hint-box"} onClick={handleGetUniverHelp}>
                <div><FontAwesomeIcon icon={faUser} className={"text-highlight"}/> Univer</div>
                <span className={"text-gold"}>X{match.universitary}</span>
            </button>
        </div>
    )
}
