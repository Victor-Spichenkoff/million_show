"use client"

import {LoginForm} from "@/components/auth/loginForm";
import Image from "next/image"
import GoldImage from "@/assets/images/gold.jpg"
import {Header} from "@/components/template/header";
import {Footer} from "@/components/template/footer";
import {Suspense} from "react";

export default function LoginScreen() {
    return (
        <div className={"flex flex-col justify-between items-center h-full"}>
            <Header label={"Login"}/>
            <div
                className={"flex flex-col-reverse md:flex-row max-w-[400px] min-h-[600px] md:max-w-[1000px] md:min-h-0 " +
                    " bg-primary mx-3 rounded-xl overflow-hidden shadow-xl shadow-black/30"}>
                <Suspense>
                    <LoginForm/>

                </Suspense>
                <div className={"flex-1 bg-gold min-h-[205] md:min-w-[550px] shadow-black/40 shadow-md"}>
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
    )
}
