import {Historic} from "@/types/Historic";
import {formatPrize} from "@/util/match";

interface IHistoricItems {
    historic: Historic[] | null
}

export const HistoricItems = ({ historic }:IHistoricItems) => {
    return (
        <div className="space-y-4 w-full">
            {historic?.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center p-4 rounded-xl bg-back-secondary border border-highlight/40 shadow-sm"
                >
                    <div className="text-sm text-text">
                        {new Date(item.finishDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>

                    <div className="text-xl font-bold text-gold">
                        {formatPrize(item.finalPrize)}
                    </div>

                    <StateBadge state={item.finalState} />
                </div>
            ))}


        </div>
    )
}


const StateBadge = ({ state }: { state?: Historic["finalState"] }) => {
    const base = "px-3 py-1 text-xs rounded-full font-semibold";
    switch (state) {
        case "won":
            return <span className={`${base} bg-success text-white`}>WON</span>;
        case "lost":
            return <span className={`${base} bg-error text-white`}>LOST</span>;
        case "stopped":
            return <span className={`${base} bg-highlight text-black`}>STOPPED</span>;
        case "cancelled":
            return <span className={`${base} bg-gray-400 text-black`}>CANCELLED</span>;
        default:
            return <span className={`${base} bg-foreground text-black`}>None</span>;
    }
}
