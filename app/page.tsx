import ThemeToggle from "@/components/utils/themeToggle";

import { Trophy } from "@/components/animation/trophy";

import { Header } from "@/components/template/header";
import { LandSection } from "@/components/home/landSection";
import { GoldMount } from "@/components/animation/goldMount";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropInstructions } from "@/components/home/dropArea";
import { InstructionItem } from "@/components/home/instructionItem";

export default function Home() {

    return (
        <div className={"flex flex-col items-center"} >
            <Header label={"Welcome"} showLoginButton />
            <LandSection>
                <h2>Are you really the smartest?</h2>
                <p>Participate in a smart quiz with a lot of emotion in the road to the <strong className={"text-gold font-bold"}>million dollar</strong> prize!</p>
                <div className={"mb-8"}>
                    <GoldMount />

                </div>
            </LandSection>

            <LandSection>
                <h2>Win Prizes</h2>
                <p>How far can you go?
                    <Link href={"/auth/create"} className={"auth-link underline hover:text-black"}> Test it now</Link>
                </p>
                <div className={"w-full h-[250px] bg-gold"}>
                    PIRAMID? PRIZE ROUTE?
                </div>
            </LandSection>

            <LandSection>
                <h2>Answer question</h2>
                <p>How is your cultural knowledge? History? Math?
                    and much more...</p>

                <div className={"w-full h-[250px] bg-gold"}>
                    Question? CORRECT
                </div>
            </LandSection>

            <LandSection>
                <h2>Challenge friends and the <strong className={"text-gold font-bold text-3xl"}>WORLD</strong></h2>
                <p>Can you reach the <strong className={"text-gold font-bold text-md"}>TOP</strong>?</p>
                <div className={"w-full h-[250px] bg-gold"}>
                    PRINT LEADER BOARD? SOMETHING WITH FIGHT?
                </div>
            </LandSection>

            <LandSection>
                <h2>The Game</h2>
                <ul className="list-disc list-inside px-2 text-start ">
                    <li>Try to reach the million dollar prize</li>
                </ul>
                {/* <DropInstructions /> */}
            </LandSection>


            <Button className={"bg-transparent shine-btn shine-btn-gold border my-16"}>
                Lets Play?
            </Button>

            <ThemeToggle />
        </div>
    )
}
