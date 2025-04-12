"use client"

import ThemeProvider from "./themeProvider"
import {Toaster} from "sonner";
import {useTheme} from "next-themes";

export default function Providers({children}: { children: React.ReactNode }) {


    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <ToasterProvider />
            {children}
        </ThemeProvider>

    )
}


// permitir usar o useTheme
const ToasterProvider = () => {
    const { theme } = useTheme()

    if(theme != "light" && theme != "dark")
        return (
            <Toaster richColors closeButton position={"top-right"} duration={2000} theme={"system"}/>
    )

    return (
        <Toaster richColors closeButton position={"top-right"} duration={2000} theme={theme}/>
    )
}
