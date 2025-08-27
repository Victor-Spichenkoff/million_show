import {Historic} from "@/types/Historic";
import {StateBadge} from "@/components/template/homeHistoric";
import {formatPrize} from "@/util/match";
import {defaultHelps, totalHelps} from "@/global";
import {Fragment, useRef, useState} from "react";
import {getLargeAndSmallTime, getTimeDiffInMinutes} from "@/helpers/time";

interface IHistoryTableItem {
    history: Historic
}

export const HistoryTableItem = ({history}: IHistoryTableItem) => {
    const [isOpen, setIsOpen] = useState(false)
    const extraRef = useRef<HTMLTableRowElement>(null)
    const mainRowRef = useRef<HTMLTableRowElement>(null)

    const handleClick = () => {
        if (isOpen)
            setTimeout(() => setIsOpen(false), 2000)
        else
            null
        // setIsOpen(true)
        if (!extraRef?.current?.classList.contains("showFromTop") && !extraRef?.current?.classList.contains("hiddenFromBottom")) {
            extraRef?.current?.classList.toggle("showFromTop")
            mainRowRef?.current?.classList.toggle("tr_focus")
            return
        }
        extraRef?.current?.classList.toggle("showFromTop")
        extraRef?.current?.classList.toggle("hiddenFromBottom")
        mainRowRef?.current?.classList.toggle("tr_focus")
    }

    const dateInMin = getTimeDiffInMinutes(history.finishDate, history.match.startDate)//Math.floor(dateDiff / (1000 * 60))

    const timeInfo = getLargeAndSmallTime(dateInMin)

    return (
        <Fragment key={history.id}>
            <tr
                ref={mainRowRef}
                onClick={handleClick}
                className={`px-2 border-0`}>
                <th
                    className={"text-primary-foreground/80"}
                >{new Date(history.match.startDate).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    // year: "numeric",
                })}</th>
                <th
                    className={"text-primary-foreground/80"}
                >{new Date(history.finishDate).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                })}</th>
                <th>{formatPrize(history.finalPrize)}</th>
                <th className={"hidden md:table-cell"}>{history.points}</th>
                <th className={"hidden md:table-cell"}>{totalHelps - history.match.skips - history.match.universitary - history.match.halfHalf}</th>
                <th><StateBadge state={history.match.state}/></th>
            </tr>

            {/*    EXTRA*/}
            <tr></tr>


            <tr
                ref={extraRef}
                className={`px-4 hiddenFromBottom text-start border-l-4 border-blue-500`}>
                <th colSpan={6}>
                    <div className={"text-start grid grid-cols-8 space-y-4"}>
                        <div className={"opacity-80 col-span-[2]"}>Half used</div>
                        <div className={"col-span-[6]"}>{defaultHelps.halfHalf} of {defaultHelps.halfHalf}</div>

                        <div className={"opacity-80  col-span-[2]"}>Skips used</div>
                        <div
                            className={"col-span-[6]"}>{defaultHelps.skips - history.match.skips} of {defaultHelps.skips}</div>

                        <div className={"opacity-80  col-span-[2]"}>Univer used</div>
                        <div
                            className={"col-span-[6]"}>{defaultHelps.universitary - history.match.universitary} of {defaultHelps.universitary}</div>
                    </div>
                    <div className={"text-start grid grid-cols-8"}>
                        <div className={"opacity-80 col-span-[2]"}>Question answered</div>
                        <div className={"col-span-[6] ml-4"}>{history.match.questionIndex}</div>
                    </div>
                    <div className={"text-start grid grid-cols-8 my-4"}>
                        <div className={"opacity-80 col-span-[2]"}>Total Time</div>
                        <div className={"col-span-[6]"}>{timeInfo.larger}{timeInfo.largerLabel} {timeInfo.smaller}{timeInfo.smallerLabel}</div>
                        {/*<div className={"col-span-[6]"}>{timeInfo.min}m {timeInfo.sec}s</div>*/}
                    </div>
                </th>
            </tr>

        </Fragment>
    )
}
