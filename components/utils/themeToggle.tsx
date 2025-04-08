"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, LucideProps } from "lucide-react"
import { Button } from "../ui/button"
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react"


export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [canLoad, setCanLoad] = useState(false)

    useEffect(()=>{
        setCanLoad(true)
    }, [theme])

    return (
        <button
            type="button"
            className="cursor-pointer bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] hover:bg-hover-background active:bg-active-background rounded-md border border-button-border-color p-1.5 [transition:background_20ms_ease-in,_color_0.15s]"
            title="Toggle theme"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        > 
            { canLoad && (
                <div>
                     {theme == "dark" ? <Sun /> : <Moon />}
                </div>
            ) }
            { !canLoad && <Moon/> }
            </button>
    )
}
