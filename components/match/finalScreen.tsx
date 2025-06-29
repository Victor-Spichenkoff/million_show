import {FinalScreenData} from "@/types/matchHelpersTypes";
import {HEADER_HEIGHT} from "@/global";

interface IFinalScreen {
    finalScreenData: FinalScreenData
}

export const FinalScreen = ({finalScreenData}: IFinalScreen) => {
    const prizeStyled = finalScreenData.finalPrize == 1_000_000 ? "1 MILLION" : finalScreenData.finalPrize/1000 + "K"

    return (
        <aside className={`bg-back text-text p-8 rounded-lg shadow-lg text-center max-w-[800px] h-fit -mt-[168px]`}>
        {/*<aside className={`bg-back text-text p-6 rounded-lg shadow-lg text-center max-w-[800px] h-fit -mt-[${HEADER_HEIGHT * 2}px]`}>*/}
            <h2 className="text-2xl font-bold mb-2">{finalScreenData.title}</h2>
            <h1 className="text-4xl mb-4">{finalScreenData.subtitle}</h1>
            <div className="text-4xl font-extrabold">
                Your Prize
                <span className={"text-gold mx-2"}>
                     { prizeStyled }
                </span>
                Dollars
            </div>
        </aside>
    )
}
