import {ReactNode} from "react";

interface ILandSection {
    children?: ReactNode
}


/*
* * Autocusomizado:
* * passar um H2
* * passar um P
*
* */
export const LandSection = ({children}: ILandSection) => {
    return (
        <section className={"landSection px-4 w-full text-start md:text-center max-w-[500px]"}>

                {children}
        </section>
    )
}
