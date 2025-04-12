"use client"

import dynamic from "next/dynamic";


// const ThemeProvider = dynamic(() => import("@/components/utils/themeProvider"), { ssr: false, });
import ThemeProvider from "./themeProvider"
import {Toaster} from "sonner";

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <Toaster richColors closeButton position={"top-right"} duration={2000} theme="dark"/>
            {children}
        </ThemeProvider>

    )
}


