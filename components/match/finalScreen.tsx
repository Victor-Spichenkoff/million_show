import {FinalScreenData} from "@/types/matchHelpersTypes";
import {HEADER_HEIGHT} from "@/global";

interface IFinalScreen {
    finalScreenData: FinalScreenData
}

export const FinalScreen = ({finalScreenData}: IFinalScreen) => {
    const prizeStyled = finalScreenData.finalPrize == 1_000_000 ? "1 MILLION" : finalScreenData.finalPrize/1000 + "K"

    return (
        <aside className={`bg-back text-text p-8 rounded-lg shadow-lg text-center max-w-[800px] h-fit mx-auto `}>
            <h2 className="text-2xl font-bold mb-2">{finalScreenData.title}</h2>
            <h1 className="text-4xl mb-4 text-gold">{finalScreenData.subtitle}</h1>
            <div className="text-4xl font-extrabold">
                You won
                <span className={"text-gold mx-2"}>
                     {prizeStyled}
                </span>
                Dollars

                and

                <span className={"text-gold mx-2"}>
                     {finalScreenData.points}
                </span>
                points
            </div>

            {/*<div className="text-4xl font-extrabold">*/}
            {/*    Your Prize*/}
            {/*    <span className={"text-gold mx-2"}>*/}
            {/*         { prizeStyled }*/}
            {/*    </span>*/}
            {/*    Dollars*/}
            {/*</div>*/}
            {/*<div className="text-4xl font-extrabold">*/}
            {/*    Your Points*/}
            {/*    <span className={"text-gold mx-2"}>*/}
            {/*         { finalScreenData.points }*/}
            {/*    </span>*/}
            {/*</div>*/}
        </aside>
    )
}
