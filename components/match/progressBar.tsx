interface IProgressBar {
    questionIndex: number
    className?: string
}


export const ProgressBar = ({questionIndex, className}: IProgressBar) => {
    return (
        <div
            className={`relative border-2 border-text h-4 w-full max-w-[500px] mx-auto my-8 rounded-sm overflow-hidden lg:w-2 lg:h-[350px] lg:rotate-180 ` + className}>
            {/*VERTICAL*/}
            <div
                className={`bg-bar h-full transition-all duration-200 hidden lg:block self-end`}
                style={{height: `calc(${(questionIndex - 1) * 100 / 15}%)`}}
            ></div>
            {/*HORIZONTAL*/}
            <div
                style={{width: `${(questionIndex - 1) * 100 / 15}%`}}
                className={`bg-bar h-full transition-all duration-200 lg:hidden`}
                // style={{height: `calc(100% - ${(questionIndex - 1) * 100 / 15}%)`}}
                // style={{width: `${(questionIndex - 1) * 100 / 14}%`, height: `calc(100% - ${(questionIndex - 1) * 100 / 14}%)`}}
            ></div>
        </div>
    )
}
