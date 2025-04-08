"use client"

import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps,
} from "next-themes";

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


const ThemeProvider = ({
    children,
    ...props
}: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}