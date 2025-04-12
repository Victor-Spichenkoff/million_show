"use client"

import {Header} from "@/components/template/header";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        setTimeout(()=> router.push("/"), 1300)
    }, [])

    return (
        <div className={"flex flex-col h-screen"}>
            <Header label={"Not Found"} />
            <div className={"flex flex-col item-center justify-center flex-1 "}>

            <p className={"mx-auto text-2xl font-black"}>This page doesn't exist, returning to home...</p>
            </div>
        </div>
    )
}
