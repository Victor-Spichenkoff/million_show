export const HomeSkeleton = () => {
    const animation = "bg-highlight/80 animate-pulse bg-highlight/80 animate-pulse "

    return (
        <div
            className={`max-w-[400px] px-4 lg:max-w-[var(--max_w)]  lg:w-full lg:flex flex-col`}>
            {/*leadernboard*/}
            <div className={"flex-1"}>
                <div>
                    <div className={`skeleton-home-card flex mb-4 w-full lg:flex-1 ${animation}`}>
                    </div>
                </div>
            </div>
            <div className={"home-action-large"}>
                <div className={"flex flex-col gap-4"}>
                    {/*STATISTIC*/}
                    <div className={"flex justify-between gap-4"}>
                        {/*Be careful with % in     */}
                        <div className={`${animation} w-[166px] lg:w-[55%] h-[120px]  rounded-xl`}></div>
                        <div className={`${animation} w-[185px] lg:w-[45%] h-[120px]  rounded-xl`}></div>
                    </div>
                    <div className={`${animation} w-full h-[92px] rounded-xl`}></div>

                </div>
                <div className={"home-action-area-container"}>
                    {/*ADM*/}
                    <div className={`flex-1 h-[84px] rounded-lg shadow-md shadow-black/40 ${animation}`}></div>
                    {/*ACTION*/}
                    <div className={"space-y-2 mt-4 "}>
                        <div className={`w-full h-[36px] rounded-lg ${animation}`}></div>
                        <div className={`w-full h-[36px] rounded-lg ${animation}`}></div>
                    </div>
                </div>
                <div className={"w-full max-h-full home-historic-area-container mt-4 lg:mt-0 flex flex-col"}>
                    <div className={"lg:max-h-[176px] truncate lg:pb-8 flex-1"}>
                        <div className="space-y-4 w-full">
                            <div className={`h-[63px] rounded-xl shadow-sm ${animation}`}></div>
                            <div className={`h-[63px] rounded-xl shadow-sm ${animation}`}></div>
                            <div className={`h-[63px] rounded-xl shadow-sm ${animation}`}></div>
                            <div className={`h-[63px] rounded-xl shadow-sm ${animation}`}></div>

                        </div>
                    </div>
                        <div className={`${animation} mt-4 w-full h-[36px] font-bold py-2 rounded-lg transition`}></div>
                </div>
            </div>
        </div>)
}
