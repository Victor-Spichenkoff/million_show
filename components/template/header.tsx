import {Button} from "@/components/ui/button";
import {Bounce} from "react-awesome-reveal";
import {useIsLogged} from "@/hooks/useIsLogged";
import {useRouter} from "next/navigation";

interface IHeader {
    label: string
    showConfig?: boolean
    showLoginButton?: boolean
}

export const Header = ({label, showConfig, showLoginButton}: IHeader) => {
    const isLogged = useIsLogged()
    const router = useRouter()


    const handleLoginClick = () => {
        if (isLogged)
            return router.push("/auth/create")

        router.push("/home")
    }

    return (
        <header className={"relative border-text border-b-2 w-screen text-center py-3 text-3xl " +
            "font-black font-merriweather mb-2 max-w-[1200px]"}>
            <h1>{label}</h1>
            <div className={"absolute top-[0px] right-3"}>
                {showLoginButton && (
                    <Bounce>
                        <Button
                            onClick={handleLoginClick}
                            className={"shine-btn shine-btn-gold border-2 border-gold text-primary-foreground hover:bg-gold/90" +
                                ""}>{isLogged ? "Home" : "SignUp"}
                        </Button>
                    </Bounce>

                )}
            </div>
        </header>
    )

}
