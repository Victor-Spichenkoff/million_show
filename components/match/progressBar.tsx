interface IProgressBar {
    questionIndex: number
    className?: string
}


export const    ProgressBar = ({questionIndex, className}: IProgressBar) => {
    return (
        <div
            className={`border-2 border-text h-4 w-full max-w-[500px] mx-auto my-8 rounded-sm overflow-hidden lg:w-2 lg:h-[350px]   ` + className }>
            <div
                className={`bg-bar h-full transition-all duration-200 lg:rotate-180`}
                style={{width:  `${(questionIndex - 1) * 100 / 14}%`, height: `calc(100% - ${(questionIndex - 1) * 100 / 14}%)`}}
            >
            </div>
        </div>
    )
}
