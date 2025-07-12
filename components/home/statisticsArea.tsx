import {HomeInfos} from "@/types/responses/home";

interface IHomeStatisticsArea {
    homeInfos: HomeInfos
}

export const HomeStatisticsArea = ({homeInfos}: IHomeStatisticsArea) => {
    return (
        <div className={"flex flex-col"}>
            <div>
                <div className={"home-box"}>
                    <p className={"home-box-title"}>Correct Answers</p>
                    <p className={"home-box-value"}>{homeInfos.correctAnswers}</p>
                </div>
                <div className={"home-box"}>
                    <p className={"home-box-title"}>Accumulated Prize</p>
                    <p className={"home-box-value"}>$ {homeInfos.accumulatedPrizes}</p>
                </div>
            </div>

            <div className={"home-box"}>
                <p className={"home-box-title"}>Recent Points</p>
                <p className={"home-box-value"}>{homeInfos.points}</p>
            </div>
        </div>
    )
}
