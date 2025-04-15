import {Button} from "@/components/ui/button";
import {Bounce} from "react-awesome-reveal";

interface IHeader {
    label: string
    showConfig?: boolean
    showLoginButton?: boolean
}

export const Header = ({label, showConfig, showLoginButton}: IHeader) => {
    return (
        <header className={"relative border-text border-b-2 w-screen text-center py-3 text-3xl " +
            "font-black font-merriweather mb-2 max-w-[1200px]"}>
            <h1>{label}</h1>
            <div className={"absolute top-[0px] right-3"}>
                {showLoginButton && (
                    <Bounce>
                        <Button
                            className={"shine-btn shine-btn-gold border-2 border-gold text-primary-foreground hover:bg-gold/90" +
                            ""}>Sign
                            Up</Button>
                    </Bounce>

                )}
            </div>
        </header>
    )

}
