import {ReactNode} from "react";

interface ILandSection {
    children?: ReactNode
    extraClass?: string
}


/*
* * Auto customizado:
* * passar um H2
* * passar um P
*
* */
export const LandSection = ({children, extraClass}: ILandSection) => {
    return (
            <section className={`landSection ${extraClass} px-4 w-full text-start md:text-center max-w-[500px] overflow-visible h-fit`}>
                    {children}
            </section>
    )
}
