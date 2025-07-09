interface IPrizes {
    wrongPrize?: number
    stopPrize?: number
    nextPrize?: number
}

export const Prizes = ({stopPrize, wrongPrize, nextPrize}: IPrizes) => {
    if(nextPrize == undefined || wrongPrize == undefined || stopPrize == undefined) return null

    // const styleFinal = nextPrize == 1_000_000 ? "1 MILLION" : `${nextPrize / 1_000} K`

    const formatPrize = (prize: number) => {
        switch (prize) {
            case 0:
                return 0
            case 1_000_000:
                return "1 MILLION"
            default:
                return `${prize / 1_000} K`
        }
    }

    return (
        <div className={`flex justify-between px-4 mt-8 w-full max-w-max_w_question lg:flex-col-reverse lg:h-full lg:mt-0`}>

            <div className="flex flex-col items-center">
                <div
                    className="
                      px-5 py-1
                      bg-gradient-to-b from-yellow-300 to-yellow-500
                      flex justify-center items-center
                      text-2xl font-bold text-red-600
                      rounded-md shadow-inner shadow-yellow-900 border border-yellow-700
                      "
                >
                    { formatPrize(wrongPrize)}
                    {/*{wrongPrize / 1_000} K*/}
                </div>
                <div className="text-lg text-center font-semibold mt-1 tracking-wide text-foreground">
                    WRONG
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div
                    className="
                      px-5 py-1
                      bg-gradient-to-b from-yellow-300 to-yellow-500
                      flex justify-center items-center
                      text-2xl font-bold text-red-600
                      rounded-md shadow-inner shadow-yellow-900 border border-yellow-700
                      "
                >
                    { formatPrize(stopPrize)}
                    {/*{stopPrize/1_000} K*/}
                </div>
                <div className="text-lg text-center font-semibold mt-1 tracking-wide text-foreground">
                    STOP
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div
                    className="
                      px-5 py-1
                      bg-gradient-to-b from-yellow-300 to-yellow-500
                      flex justify-center items-center
                      text-2xl font-bold text-red-600
                      rounded-md shadow-inner shadow-yellow-900 border border-yellow-700
                      "
                >
                    {/*{styleFinal}*/}
                    { formatPrize(nextPrize)}
                </div>
                <div className="text-lg text-center font-semibold mt-1 tracking-wide text-foreground">
                    RIGHT
                </div>
            </div>

        </div>)
}
