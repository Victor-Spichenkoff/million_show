export const QuestionSkeleton = () => {
    return (
        <div>
            <div className={"bg-question h-[44px] rounded-b-lg px-4 py-2 animate-pulse"}></div>

            <div className={"mt-3 space-y-1 rounded-lg"}>
                <div className={`answer h-[44px] animate-pulse`}></div>
                <div className={`answer h-[44px] animate-pulse`}></div>
                <div className={`answer h-[44px] animate-pulse`}></div>
                <div className={`answer h-[44px] animate-pulse`}></div>
            </div>
        </div>
    )
}
