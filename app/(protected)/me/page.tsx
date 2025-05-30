"use client"

import ThemeToggle from "@/components/utils/themeToggle";
import Image from "next/image";
import {LogoutButton} from "@/components/utils/logoutButton";
import {Header} from "@/components/template/header";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {toast} from "sonner";
import {User} from "@/types/user";

export default function Home() {
    const [name, setName] = useState("")
    const getMe = useProtectedApiCall<User>({
        endpoint:"/user/me"
    })


    const handlebtnClick = async () => {
        const res = await getMe()

        if(res.isError)
            return toast.error(res.errorMessage)

        setName(res.response.userName)
    }


  return (
    <div className="flex flex-col items-center text-2xl bg-back h-screen w-screen" >
      <Header label="ME" />
      <ThemeToggle />
        <LogoutButton />
        <Button onClick={handlebtnClick}>Get me</Button>
        <div>{name}</div>
    </div>
  )
}
