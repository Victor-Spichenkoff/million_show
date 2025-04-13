import ThemeToggle from "@/components/utils/themeToggle";
import Image from "next/image";
import {Trophy} from "@/components/animation/trophy";
import {DuelAvatars} from "@/components/animation/duel";
import {Header} from "@/components/template/header";

export default function Home() {

  return (
    <div className={"flex flex-col"} >
        <Header label={"Welcome"} showLoginButton/>

      <ThemeToggle />
    </div>
  )
}
