import {Historic} from "@/types/Historic";
import {StateBadge} from "@/components/template/homeHistoric";
import {formatPrize} from "@/util/match";
import {defaultHelps, totalHelps} from "@/global";
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


    const usedHalf = defaultHelps.halfHalf - history.match.halfHalf
    const usedSkips = defaultHelps.skips - history.match.skips
    const usedUniver = defaultHelps.universitary - history.match.universitary

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

            {/*<tr*/}
            {/*    ref={extraRef}*/}
            {/*    className={`px-4 hiddenFromBottom text-start`}*/}
            {/*>*/}
            {/*    <th colSpan={6} className="bg-[#0e1f45] border-l-4 border-blue-500">*/}
            {/*        <div className="p-4 text-sm grid grid-cols-8 gap-y-2">*/}
            {/*            <span className="text-gray-400 col-span-2">Half used</span>*/}
            {/*            <span className="col-span-6">{usedHalf} / {defaultHelps.halfHalf}</span>*/}

            {/*            <span className="text-gray-400 col-span-2">Skips used</span>*/}
            {/*            <span className="col-span-6">{usedSkips} / {defaultHelps.skips}</span>*/}

            {/*            <span className="text-gray-400 col-span-2">Univer used</span>*/}
            {/*            <span className="col-span-6">{usedUniver} / {defaultHelps.universitary}</span>*/}

            {/*            <span className="text-gray-400 col-span-2">Question answered</span>*/}
            {/*            <span className="col-span-6">{history.match.questionIndex}</span>*/}
            {/*        </div>*/}
            {/*    </th>*/}
            {/*</tr>*/}
            {/*<tr*/}
            {/*    ref={extraRef}*/}
            {/*    className={`px-4 hiddenFromBottom text-start`}*/}
            {/*>*/}
            {/*    <th colSpan={6}>*/}
            {/*        <div className="grid grid-cols-2 gap-4 p-4 bg-[#0e1f45] rounded-md">*/}
            {/*            <div>*/}
            {/*                <p className="text-gray-400 text-xs">Half used</p>*/}
            {/*                <p className="text-white">{usedHalf} / {defaultHelps.halfHalf}</p>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <p className="text-gray-400 text-xs">Skips used</p>*/}
            {/*                <p className="text-white">{usedSkips} / {defaultHelps.skips}</p>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <p className="text-gray-400 text-xs">Univer used</p>*/}
            {/*                <p className="text-white">{usedUniver} / {defaultHelps.universitary}</p>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <p className="text-gray-400 text-xs">Question answered</p>*/}
            {/*                <p className="text-white">{history.match.questionIndex}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </th>*/}
            {/*</tr>*/}

            {/*<tr*/}
            {/*    ref={extraRef}*/}
            {/*    className={`px-4 hiddenFromBottom text-start`}*/}
            {/*    >*/}
            {/*    <th colSpan={6}>*/}
            {/*        <div className="m-2 p-4 bg-[#142850] rounded-lg shadow-lg animate-fadeIn">*/}
            {/*            <div className="grid grid-cols-8 gap-y-2 text-sm">*/}
            {/*                <div className="text-gray-400 col-span-2">Half used</div>*/}
            {/*                <div className="col-span-6">{usedHalf} of {defaultHelps.halfHalf}</div>*/}

            {/*                <div className="text-gray-400 col-span-2">Skips used</div>*/}
            {/*                <div className="col-span-6">{usedSkips} of {defaultHelps.skips}</div>*/}

            {/*                <div className="text-gray-400 col-span-2">Univer used</div>*/}
            {/*                <div className="col-span-6">{usedUniver} of {defaultHelps.universitary}</div>*/}

            {/*                <div className="text-gray-400 col-span-2">Question answered</div>*/}
            {/*                <div className="col-span-6">{history.match.questionIndex}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </th>*/}
            {/*</tr>*/}


            <tr
                ref={extraRef}
                className={`px-4 hiddenFromBottom text-start border-l-4 border-blue-500`}>
                <th colSpan={6}>
                    <div className={"text-start grid grid-cols-8 space-y-4"}>
                        <div className={"opacity-80 col-span-[2]"}>Half used </div>
                        <div className={"col-span-[6]"}>{defaultHelps.halfHalf} of {defaultHelps.halfHalf}</div>

                        <div className={"opacity-80  col-span-[2]"}>Skips used </div>
                        <div className={"col-span-[6]"}>{defaultHelps.skips - history.match.skips} of {defaultHelps.skips}</div>

                        <div className={"opacity-80  col-span-[2]"}>Univer used </div>
                        <div className={"col-span-[6]"}>{defaultHelps.universitary - history.match.universitary} of {defaultHelps.universitary}</div>
                    </div>
                    <div className={"text-start grid grid-cols-8"}>
                        <div className={"opacity-80 col-span-[2]"}>Question answered</div>
                         <div className={"col-span-[6] ml-4"}>{history.match.questionIndex}</div>
                    </div>
                </th>
            </tr>

        </Fragment>
    )
}
