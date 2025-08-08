import {LeaderboardPlayers} from "@/types/responses/points";
import {LeaderboardTableItem} from "@/components/leaderboard/leaderboardTableItem";
import {usePagination} from "@/hooks/global/usePagination";
import {Button} from "@/components/ui/button";
import {Loading} from "@/components/template/loading";

export const PlayersTable = () => {
    // const [playersInfo, setPlayersInfo] = useState<[] | null>(null)

    const {pageItens: playersInfo, getMore, isAll, isLoading} = usePagination<LeaderboardPlayers>({
        urlFactory: (p) => `/points/leaderboard/points?page=${p}`,
        cacheFactory: p => `leaderboard_${p}`,
        take: 10,
        cacheBaseId: "leaderboard_"
    })

    return (
        <div className={"px-4 rounded-lg overflow-hidden"}>
            <table className={"rounded-table"}>
                <thead>
                <tr>
                    <th>POS</th>
                    <th>PLAYER</th>
                    <th>POINTS</th>
                    <th className={"hidden md:table-cell"}>TOTAL CORRECT</th>
                    <th className={"hidden md:table-cell"}>BEST MATCH</th>
                    <th className={"hidden md:table-cell"}>AVG (min)</th>
                    <th>HELPS</th>
                </tr>
                </thead>
                <tbody>
                {playersInfo?.map((pi, i) => (
                    <LeaderboardTableItem
                        key={i}
                        data={pi}
                        position={i + 1}
                    />
                ))}
                </tbody>
            </table>

            <div className={"w-fit mx-auto"}>
                {isLoading && (
                    <Loading isDisplayBlock size={35}/>
                )}

                {isAll && !isLoading && (
                    <div className={"no-more-label"}>That's All</div>
                )}

                {!isAll && !isLoading && (
                    <Button
                        onClick={getMore}
                        className={"mt-8 max-w-[150px] mx-auto"}>Load More</Button>
                )}
            </div>
        </div>
    )
}
