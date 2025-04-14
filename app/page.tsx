import ThemeToggle from "@/components/utils/themeToggle";

import {Trophy} from "@/components/animation/trophy";

import {Header} from "@/components/template/header";
import {LandSection} from "@/components/home/landSection";
import {GoldMount} from "@/components/animation/goldMount";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {

  return (
    <div className={"flex flex-col items-center"} >
        <Header label={"Welcome"} showLoginButton/>
        <LandSection>
            <h2>Are you really the smartest?</h2>
            <p>Participate in a smart quiz with a lot of emotion in the road to the <strong className={"text-gold font-bold"}>million dollar</strong> prize!</p>
            <div className={"mb-8"}>
            <GoldMount/>

            </div>
        </LandSection>

        <LandSection>
            <h2>Win Prizes</h2>
            <p>How far can you go?
                <Link href={"/auth/create"} className={"auth-link"}>Test it now</Link>
            </p>
        </LandSection>


        <Button className={"bg-transparent shine-btn shine-btn-gold"}>
            Lets Play?
        </Button>

      <ThemeToggle />
    </div>
  )
}
