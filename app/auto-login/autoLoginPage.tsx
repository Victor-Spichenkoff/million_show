import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useAutoLogin} from "@/hooks/useAutoLogin";
import {useIsLogged} from "@/hooks/useIsLogged";
import {toast} from "sonner";
import {Header} from "@/components/template/header";
import {ConnectionTest} from "@/components/utils/connectionTest";
import {Loading} from "@/components/template/loading";
import {LoginDialog} from "@/components/autoLogin/loginDialog";
import Link from "next/link";

export function AutoLoginPage() {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const [isLoginError, setLoginError] = useState(false)
    const [lockAction, setLockActions] = useState(true)
    const {login, createAndLogin} = useAutoLogin()
    const isLogged = useIsLogged()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (isLogged) {
            toast.success("You're already logged in")
            return router.push("/")
        }
        if (lockAction)
            return

        (async () => {
            setIsLoading(true)
            const errorMessage = await login()
            setIsLoading(false)
            if (errorMessage) {
                toast.error(errorMessage, {position: "top-left"})
                setLoginError(true)
            }

            toast.success("You're logged in successfully!", {position: "top-left"})
            const previous = searchParams.get('previous')
            const pathname = previous ?? "/"
            return router.push(pathname)
        })()
    }, [lockAction])


    const handleCreateClick = async () => {
        setIsLoading(true)
        const errorMessage = await createAndLogin()

        if (errorMessage) {
            setIsLoading(false)
            toast.error(errorMessage, {position: "top-left"})
        }

        toast.success("Account created successfully!", {position: "top-left"})
        const previous = searchParams.get('previous')
        const pathname = previous ?? "/"
        return router.push(pathname)

    }


    return (
        <div className={"relative flex flex-col justify-center items-center min-h-screen max-w-max_w mx-auto"}>
            <Header showConfig showLogo label={"Auto Login"}/>
            <ConnectionTest setLockActions={setLockActions}/>
            <main className="-mt-header-height flex-1 flex flex-col items-center justify-center gap-4">
                {isLoading && (
                    <Loading isDisplayBlock/>
                )}

                <h1 className="text-2xl font-bold">{isLoginError ? "Sign Up..." : "Signing you in..."}</h1>
                <p className="text-muted-foreground">
                    {isLoginError ?
                        "Would you like to create an account? We'll do all the work!" :
                        "Please wait a moment while we prepare everything."}</p>
                {isLoginError && (
                    <div>
                        <LoginDialog onClick={handleCreateClick}/>
                    </div>
                )}
            </main>

            <footer className={"absolute bottom-0 right-0 bg-primary px-2 py-1 rounded-md text-sm text-gray-100/80"}>
                Having trouble? Make manual <Link className={"link text-gold"} href={"/auth"}>Sign Up</Link>
            </footer>
        </div>
    )
}
