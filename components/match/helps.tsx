import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLightbulb, faArrowRotateForward, faUser} from "@fortawesome/free-solid-svg-icons";
import {MatchHint} from "@/types/hint";
import {Match} from "@/types/responses/match";
import {useEffect, useTransition} from "react";
import {GetHintStateStorage, UpdateHintStateStorage} from "@/storage/localStorage/match";
import {toast} from "sonner";
import {HalfHint, UniverHint} from "@/types/responses/hint";
import {Loading} from "@/components/template/loading";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {ISetFrontendQuestion} from "@/hooks/useGetQuestion";
import {clearAllCache} from "@/util/cache";


interface IHelps {
    setMatchHint: (x: MatchHint) => void
    match: Match
    hintState: MatchHint
    getQuestionOnApi: (isNew?: boolean) => Promise<void>
    setQuestion: ISetFrontendQuestion
    getAndSetMatchInfo: () => Promise<any>
}

export const Helps = ({setMatchHint, match, hintState, getQuestionOnApi, setQuestion, getAndSetMatchInfo}: IHelps) => {
    const [isLoading, startTransition] = useTransition()
    const getUniverHelp = useProtectedApiCall<UniverHint>({
        endpoint: "/hint/universitary"
    })
    const getHalfHelp = useProtectedApiCall<HalfHint>({
        endpoint: "/hint/half"
    })
    const getSkip = useProtectedApiCall<HalfHint>({
        endpoint: "/hint/skip"
    })

    useEffect(() => {
        const storageHint = GetHintStateStorage()

        if (storageHint?.type != "none" && storageHint) {
            setMatchHint(storageHint)
        }
    }, [])

    const handleGetUniverHelp = async () => {
        if (hintState && hintState.type != "none")
            return toast.warning("you've already been helped")

        startTransition(async () => {
            // const token = await getAccessToken()
            const res = await getUniverHelp()

            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }
            match.universitary -= 1
            UpdateHintStateStorage({...res.response, type: "univer"})
            setMatchHint({...res.response, type: "univer"})

        })
    }


    const handleGetHalfHelp = async () => {
        if (hintState && hintState.type != "none")
            return toast.warning("you've already been helped")

        startTransition(async () => {
            const res = await getHalfHelp()

            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }


            UpdateHintStateStorage({...res.response, type: "half"})
            match.halfHalf -= 1
            setMatchHint({...res.response, type: "half"})
        })
    }


    const handleSkip = async () => {
        startTransition(async () => {
            const result = await getSkip()

            if (result.isError) {
                toast.error(result.errorMessage)
                return
            }
            toast.success("You've skipped")
            match.skips -= 1

            clearAllCache()

            setQuestion("loading")
            await getQuestionOnApi(true)
            await getAndSetMatchInfo()

            //RESETS
            setMatchHint({type: "none"})
            UpdateHintStateStorage("")
        })
    }

    return (
        <div className={"flex justify-around bg-hint border-b border-question-border border-collapse" +
            " rounded-tl-lg rounded-tr-lg relative"}>
            {isLoading && <Loading/>}
            <button className={"hint-box"} onClick={handleGetHalfHelp}>
                <div><FontAwesomeIcon icon={faLightbulb} className={"text-yellow-500"}/> 50/50</div>
                <span className={"text-gold"}>X{match.halfHalf}</span>
            </button>
            <div className={"h-[80%] w-[.5px] bg-white absolute left-[33%] top-[50%] translate-y-[-50%]"}></div>
            <button className={"hint-box"} onClick={handleSkip}>
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
