export type FinalScreenData = {
    finalPrize: number
    points?: number
    title: FinalScreenDataTitle
    subtitle: FinalScreenDataSubtitle
}


export type FinalScreenDataTitle = "Congratulations" | "Sorry" | "You decided to"
export type FinalScreenDataSubtitle = "You WON!!!" | "You Lost" | "STOP"
