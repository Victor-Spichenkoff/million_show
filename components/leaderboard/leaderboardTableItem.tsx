import {LeaderboardPlayers} from "@/types/responses/points";
import {minuteWithSeconds} from "@/helpers/time";
import {GetUserStorage} from "@/storage/localStorage/user";
import {useRouter} from "next/navigation";

interface ILeaderboardTableItem {
    data: LeaderboardPlayers
    position: number
}

export const LeaderboardTableItem = ({data, position}:ILeaderboardTableItem) => {
    const router = useRouter()
    const avgTime = minuteWithSeconds(data.avgTotalTime)
    const user = GetUserStorage()

    const handleClick = () => {
        if(data.userId)
           router.push(`/history/${data.userId}`)
    }

    return (
        <tr
            onClick={handleClick}
            // TODO: UNCOMMENT
            // className={`${user?.id == data.userId -5 && "border-3 border-gold"}
            className={`${user?.id == data.userId && "border-3 border-gold"} 
           `}>
            {/*hover:scale-105 duration-300`}>*/}
            <th >{position}°</th>
            <th >{data.userName}</th>
            <th>{data.totalPoints}</th>
            <th className={"hidden md:table-cell"}>{data.totalCorrects}</th>
            <th className={"hidden md:table-cell"} title="Most correct in one match">{data.bestMatchCorrects}</th>
            <th className={"hidden md:table-cell"} title="Average Time in minutes">{avgTime.min}:{avgTime.sec}</th>
            <th>{data.totalUsedHelps}</th>
        </tr>
    )
}
