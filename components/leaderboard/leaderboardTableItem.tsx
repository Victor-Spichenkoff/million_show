import {LeaderboardPlayers} from "@/types/responses/points";
import {minuteWithSeconds} from "@/helpers/time";
import {GetUserStorage} from "@/storage/localStorage/user";

interface ILeaderboardTableItem {
    data: LeaderboardPlayers
    position: number
}

export const LeaderboardTableItem = ({data, position}:ILeaderboardTableItem) => {
    const avgTime = minuteWithSeconds(data.avgTotalTime)
    const user = GetUserStorage()

    return (
        // <tr>
        <tr className={`${user?.id == data.userId -5 && "border-3 border-gold"}`}>
            <th >{position}°</th>
            <th >{data.username}</th>
            <th>{data.totalPoints}</th>
            <th className={"hidden md:table-cell"}>{data.totalCorrects}</th>
            <th className={"hidden md:table-cell"} title="Most correct in one match">{data.bestMatchCorrects}</th>
            <th className={"hidden md:table-cell"} title="Average Time in minutes">{avgTime.min}:{avgTime.sec}</th>
            <th>{data.totalUsedHelps}</th>
        </tr>
    )
}
