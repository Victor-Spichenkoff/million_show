"use client"

import {LoginForm} from "@/components/auth/loginForm";
import {Header} from "@/components/template/header";
import {Footer} from "@/components/template/footer";
import {Suspense, useEffect, useState} from "react";
import Link from "next/link";
import {CreateForm} from "@/components/auth/createForm";
import {useSearchParams} from "next/navigation";

export default function LoginScreen() {
    const [isLogin, setIsLogin] = useState(true)

    const searchParams = useSearchParams()

    useEffect(() => {
        if(searchParams.has("create"))
            setIsLogin(false)
    }, [])

    return (
        <Suspense>
        <div className={"flex flex-col justify-between items-center h-full"}>
            <Header label={"Login"}/>
            <div
                className={"flex flex-col-reverse md:flex-row max-w-[400px] min-h-[600px] md:max-w-[1000px] md:min-h-0 " +
                    " bg-primary mx-3 rounded-4xl overflow-hidden shadow-lg shadow-black/30"}
            >
                <Suspense>
                    {isLogin ? (
                        <LoginForm setIsLogin={setIsLogin}/>

                    ) : <CreateForm setIsLogin={setIsLogin}/>}
                </Suspense>
                <div
                    className={"flex-1 bg-gold min-h-[205] amd:amin-w-[550px] lg:min-w-[550px] shadow-black/40 shadow-md"}>
                    <div style={{
                        backgroundImage: 'url("/gold.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }} className={"w-full h-full"}>
                    </div>
                </div>
            </div>
            <Footer notAbsolute/>
        </div>
        </Suspense>
    )
}
