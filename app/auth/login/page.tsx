"use client"

import {LoginForm} from "@/components/auth/loginForm";
import Image from "next/image"
import GoldImage from "@/assets/images/gold.jpg"

export default function LoginScreen() {
    return (
        <div className={"flex flex-col justify-between h-full font-oswald"}>
            <div>HEADER</div>
            <div className={"flex flex-col-reverse md:flex-row max-w-[400px] md:max-w-[700px] bg-primary mx-auto"}>
                <LoginForm/>
                <div className={"flex-1"}>
                    <Image src={GoldImage} alt={"gold"} className={"h-full"}/>
                </div>

            </div>
            <footer>Footer</footer>
        </div>
    )
}
