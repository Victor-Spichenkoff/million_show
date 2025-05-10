import ThemeToggle from "@/components/utils/themeToggle";

// import { Trophy } from "@/components/animation/trophy";

import { Header } from "@/components/template/header";
import { LandSection } from "@/components/home/landSection";
import { GoldMount } from "@/components/animation/goldMount";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { faDashboard, faBrain, faMoneyBillWaveAlt, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image";
import PiramidImage from "@/assets/images/prize_piramid.png"

export default function Home() {

    return (
        <div className={"flex flex-col items-center overflow-hidden"} >
            <Header label={"Welcome"} showLoginButton showLogo/>
            <LandSection>
                <h2>
                    Are you really the smartest?
                    <FontAwesomeIcon icon={faBrain} className="text-[#F3B5B8] inline mx-2 size-7" />
                </h2>
                <p>Participate in a smart quiz with a lot of emotion in the road to the <strong className={"text-gold font-bold"}>million dollar</strong> prize!</p>
                <div className={"mb-8"}>
                    <GoldMount />
                </div>
            </LandSection>

            <LandSection>
                <h2>
                    Win Prizes
                    <FontAwesomeIcon icon={faMoneyBillWaveAlt} className="text-[#168118] inline mx-2 size=7" />
                </h2>
                <p>How far can you go?
                    <Link href={"/auth/create"} className={"auth-link underline hover:text-black ml-1"}>Test it now</Link>
                </p>
                <div className={"w-full bg-slate-800"} id="pyramid-img">
                    <Image src={PiramidImage} alt="Prize Route" className="w-full" id="img-shadow"
                    />
                </div>
            </LandSection>

            <LandSection>
                <h2>
                    Answer question
                </h2>
                <p>How is your cultural knowledge? History? Math?
                    and much more...</p>

                <div className={"w-full h-[250px] bg-gold"}>
                    PRINT Question screen? CORRECT ICON
                </div>
            </LandSection>

            <LandSection>
                <h2>
                    Challenge friends and the <strong className={"text-gold font-bold text-3xl"}>WORLD</strong>
                    <FontAwesomeIcon icon={faGlobeAmericas} className="text-sky-500 inline mx-2 size=7" />

                </h2>
                <p>Can you reach the <strong className={"text-gold font-bold text-md"}>TOP</strong>?</p>
                <div className={"w-full h-[250px] bg-gold"}>
                    PRINT LEADER BOARD? SOMETHING WITH FIGHT?
                </div>
            </LandSection>

            <LandSection>
                <h2>
                    The Game
                    <FontAwesomeIcon icon={faDashboard} className="text-primary-foreground inline mx-2 size=7" />
                    
                    </h2>
                <ul className="list-disc ml-[12px] px-2 text-start ">
                    <li>Try to reach the million dollar prize</li>
                    <li>You will need to answer 15 questions and the million dollar question</li>
                    <li>No mistake tolerance</li>
                    <li>You have 3 types of help at your disposal</li>
                    <li>Can you do this?</li>
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
