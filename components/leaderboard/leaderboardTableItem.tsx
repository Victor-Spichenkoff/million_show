import {LeaderboardPlayers} from "@/types/responses/points";
import {getLargeAndSmallTime, minuteWithSeconds} from "@/helpers/time";
import {GetUserStorage} from "@/storage/localStorage/user";
import {useRouter} from "next/navigation";
import {clearAllCache, clearCacheForPrefix} from "@/util/cache";

interface ILeaderboardTableItem {
    data: LeaderboardPlayers
    position: number
}

export const LeaderboardTableItem = ({data, position}:ILeaderboardTableItem) => {
    const router = useRouter()
    // const avgTime = minuteWithSeconds(data.avgTotalTime)
    const timeInfo = getLargeAndSmallTime(data.avgTotalTime)
    const user = GetUserStorage()

    const handleClick = () => {
        if(data.userId) {
            clearAllCache()
           router.push(`/history/${data.userId}`)
        }
    }

    return (
        <tr
            onClick={handleClick}
            className={`${user?.id == data.userId && "border-3 border-gold"} 
           `}>
            <th >{position}°</th>
            <th >{data.userName}</th>
            <th>{data.totalPoints}</th>
            <th className={"hidden md:table-cell"}>{data.totalCorrects}</th>
            <th className={"hidden md:table-cell"} title="Most correct in one match">{data.bestMatchCorrects}</th>
            <th className={"hidden md:table-cell"} title="Average Time in minutes">{timeInfo.larger}{timeInfo.largerLabel} {timeInfo.smaller}{timeInfo.smallerLabel}</th>
            {/*<th className={"hidden md:table-cell"} title="Average Time in minutes">{avgTime.min}m {avgTime.sec}s</th>*/}
            <th>{data.totalUsedHelps}</th>
        </tr>
    )
}
