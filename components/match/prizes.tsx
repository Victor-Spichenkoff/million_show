interface IPrizes {
    wrongPrize?: number
    stopPrize?: number
    nextPrize?: number
}

export const Prizes = ({stopPrize,wrongPrize,nextPrize}: IPrizes) => {
    return (
        <div>
            {stopPrize}
        </div>
    )
}
