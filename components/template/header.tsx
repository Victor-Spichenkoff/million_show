"use client"

import {Button} from "@/components/ui/button";
import {Bounce} from "react-awesome-reveal";
import {useIsLogged} from "@/hooks/useIsLogged";
import {useRouter} from "next/navigation";
import Image from "next/image";
import LogoImage from "@/assets/images/logo.png"
import {ConfigDropDown} from "./config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

interface IHeader {
    label: string
    showConfig?: boolean
    showLoginButton?: boolean
    showLogo?: boolean
    showBackButton?: boolean
    isBackButtonUseReturn?: boolean
}

export const Header = ({
                           label,
                           showConfig,
                           showLoginButton,
                           showLogo,
                           showBackButton,
                           isBackButtonUseReturn
                       }: IHeader) => {
    const router = useRouter()
    const isLogged = useIsLogged()

    const handleLoginClick = () => {
        if (!isLogged)
            return router.push("/auto-login?previous=home")

        router.push("/home")
    }

    const handleBackClick = () => {
        if (isBackButtonUseReturn)
            router.back()

        router.push("/home")
    }

    return (
        // <header className={"relative border-text border-b-2 w-screen text-center py-3 text-3xl " +
        <header className={"relative border-text  w-screen text-center py-6 text-3xl " +
            `font-black font-merriweather max-w-max_w mx-auto`}>
            {showLogo && !showBackButton && (
                <div className="absolute top-1/2 -translate-y-1/2 left-3">
                    <Image src={LogoImage} alt="LOGO" width="50" className="hover:scale-105"/>
                </div>
            )}

            {showBackButton && (
                <div className="absolute top-1/2 -translate-y-1/2 left-3">
                    <Button
                        variant={"ghost"}
                        className={"hover:bg-text/50 dark:hover:bg-text/50 border border-text w-9 h-9 rounded-full aspect-square"}
                        onClick={handleBackClick}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className={"size-6"}/>
                    </Button>
                </div>
            )}
            <h1 className={"tracking-widest"}>{label.toUpperCase()}</h1>
            <div className={"absolute top-1/2 -translate-y-1/2 right-3"}>
                {showLoginButton && (
                    <Bounce>
                        <Button
                            onClick={handleLoginClick}
                            className={"shine-btn shine-btn-gold border-2 border-gold text-primary-foreground hover:bg-gold/90" +
                                ""}>{isLogged ? "Home" : "Quick Login"}
                        </Button>
                    </Bounce>
                )}
                {showConfig && <ConfigDropDown hideLogout={!isLogged}/>}
            </div>
        </header>
    )

}
