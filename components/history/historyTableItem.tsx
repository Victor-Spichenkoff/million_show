import {Historic} from "@/types/Historic";
import {StateBadge} from "@/components/template/homeHistoric";
import {formatPrize} from "@/util/match";
import {totalHelps} from "@/global";
import {Fragment, useRef, useState} from "react";

interface IHistoryTableItem {
    history: Historic
}

export const HistoryTableItem = ({history}: IHistoryTableItem) => {
    const [isOpen, setIsOpen] = useState(true)
    const extraRef = useRef<HTMLTableRowElement>(null)

    const handleClick = () => {
        setIsOpen(!isOpen)
        extraRef?.current?.classList.toggle("showFromTop")

    }

    return (
        <Fragment key={history.id}>

            <tr
                onClick={handleClick}
                className={`px- border-0`}>
                <th>{new Date(history.match.startDate).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    // year: "numeric",
                })}</th>
                <th>{new Date(history.finishDate).toLocaleDateString("en-GB", {
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
            {isOpen && (<>
                <tr></tr>
                <tr
                    ref={extraRef}
                    className={`px-4 ${isOpen && "showFromTop"} showFromTop`}>
                    <th colSpan={6}>
                        novas infos
                    </th>
                </tr>
            </>)}
        </Fragment>
    )
}
