import { ReactNode } from "react"

interface IINstructionItem {
    children: ReactNode
}

export const InstructionItem = ({ children }: IINstructionItem) => {
    return (
        <div>
            {children}
        </div>
    )
}