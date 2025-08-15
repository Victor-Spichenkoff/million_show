import type {Metadata} from "next"
import {Geist, Geist_Mono, Oswald, Roboto, Merriweather} from "next/font/google"
import "./globals.css"
import Providers from "@/components/utils/providers"
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'


const merriweather = Merriweather({
    variable: "--font-merriweather",//tailwind?
    subsets: ['latin'],
    weight: ["400", "700", "900"]
})
const roboto = Roboto({
    variable: "--font-roboto",//tailwind?
    subsets: ['latin'],
})
const oswald = Oswald({
    variable: "--font-oswald",//tailwind?
    subsets: ['latin'],
})

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


config.autoAddCss = false


export const metadata: Metadata = {
    title: "Million Show",
    description: "Can you beat the challenge?",
}


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body
            suppressHydrationWarning
            className={`${geistSans.variable}
                ${geistMono.variable}
                ${oswald.variable}
                ${merriweather.variable}
                ${roboto.variable}
                 antialiased transition-colors duration-500 text-text font-roboto `}
        >
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}

