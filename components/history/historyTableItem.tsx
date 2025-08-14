import {Historic} from "@/types/Historic";
import {StateBadge} from "@/components/template/homeHistoric";
import {formatPrize} from "@/util/match";
import {totalHelps} from "@/global";
import {Fragment, useRef, useState} from "react";

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
            {/*    {isOpen && (<>*/}
            <tr></tr>
            <tr
                ref={extraRef}
                className={`px-4`}>
                <th colSpan={6}>
                    novas infos
                </th>
            </tr>
            {/*</>)}*/}
        </Fragment>
    )
}
