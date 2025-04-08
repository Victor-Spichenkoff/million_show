"use client"

import dynamic from "next/dynamic";


// const ThemeProvider = dynamic(() => import("@/components/utils/themeProvider"), { ssr: false, });
import ThemeProvider from "./themeProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}


