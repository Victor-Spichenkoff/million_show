interface IProgressBar {
    questionIndex: number
}


export const ProgressBar = ({questionIndex}: IProgressBar) => {
    return (
        <div className={"border-2 border-text h-4 max-w-[500px] mx-auto my-8 rounded-sm overflow-hidden"}>

            <div
                className={`bg-bar h-full`}
                style={{width:  `${(questionIndex - 1) * 100 / 14}%`}}
            >

            </div>
        </div>
    )
}
