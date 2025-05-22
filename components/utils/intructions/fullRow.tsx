import {ReactNode} from "react";

type IInstructionsFullRowProps = {
    children?: ReactNode
    isFirstItem?: boolean
    title?: string
}

export const InstructionsFullRow = ({children, isFirstItem, title}: IInstructionsFullRowProps) => {
    return (
        <div className={`border-2 border-white ${isFirstItem && "border-t-0"} text-start text-md`} >
            <h3 className="border-b-0">{title}</h3>
            {children}
        </div>
    )
}
