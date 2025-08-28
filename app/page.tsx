"use client"

import {Header} from "@/components/template/header";
import {LandSection} from "@/components/home/landSection";
import {GoldMount} from "@/components/animation/goldMount";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {faDashboard, faBrain, faMoneyBillWaveAlt, faGlobeAmericas} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Image from "next/image";
import PyramidImage from "@/assets/images/prize_piramid.png"
import LeaderboardImage from "../assets/images/prints/leaderboard.png"
// import LeaderboardImage from "../assets/images/prints/leaderboard_up.png"
// import LeaderboardImage from "../assets/images/prints/leaderboard_dark.png"
import {useIsLogged} from "@/hooks/useIsLogged";
import {ConnectionTest} from "@/components/utils/connectionTest";
import Slider from "@/components/home/Slider";
import Q1 from "../assets/images/prints/print_q1.png"
import Q2 from "../assets/images/prints/print_q2.png"
import Q3 from "../assets/images/prints/print_q3.png"
import Q4 from "../assets/images/prints/print_q4.png"
import Q5 from "../assets/images/prints/print_q5.png"
import {Fade, Reveal, Slide, Bounce} from "react-awesome-reveal"

export default function Home() {
    const isLogged = useIsLogged()


    return (
        <div className={"flex flex-col items-center overflow-hidden"}>
            <ConnectionTest isSilent/>

            <Header label={"Welcome"} showLoginButton showLogo/>


            {/*GOLD*/}
            <Bounce triggerOnce>
                <LandSection>
                    <h2>
                        Are you really the smartest?
                        <FontAwesomeIcon icon={faBrain} className="text-[#F3B5B8] inline mx-2 size-7"/>
                    </h2>
                    <p>Participate in a smart quiz with a lot of emotion in the road to the <strong
                        className={"text-gold font-bold"}>million dollar</strong> prize!</p>
                    <div className={"mb-8"}>
                        <GoldMount/>
                    </div>
                </LandSection>
            </Bounce>

            {/*PYRAMID*/}
            <Reveal triggerOnce>

                <LandSection>
                    <h2>
                        Win Prizes
                        <FontAwesomeIcon icon={faMoneyBillWaveAlt} className="text-[#168118] inline mx-2 size=7"/>
                    </h2>
                    <p>How far can you go?
                        <Link href={"auth?create&previous=home"}
                              className={"auth-link underline hover:text-black ml-1"}>Test
                            it now</Link>
                    </p>
                    <div className={"w-full bg-slate-800"} id="pyramid-img">
                        <Image src={PyramidImage} alt="Prize Route" className="w-full" id="img-shadow"
                        />
                    </div>
                </LandSection>
            </Reveal>


            {/*QUESTION*/}
            <Reveal triggerOnce>

                <LandSection>
                    <h2>
                        Answer question
                    </h2>
                    <p>How is your cultural knowledge? History? Math?
                        and much more...</p>

                    <div className={"w-full bg-back overflow-hidden bg-gold rounded-lg"}>
                        {/*PRINT Question screen? CORRECT ICON*/}
                        <Slider
                            images={[
                                Q1, Q2, Q3, Q4, Q5
                            ]}
                        />
                    </div>
                </LandSection>
            </Reveal>


            {/*LEADERBOARD*/}
            <Reveal triggerOnce>
                <LandSection>
                    <h2>
                        Challenge friends and the <strong className={"text-gold font-bold text-3xl"}>WORLD</strong>
                        <FontAwesomeIcon icon={faGlobeAmericas} className="text-sky-500 inline mx-2 size=7"/>

                    </h2>
                    <p>Can you reach the <strong className={"text-gold font-bold text-md"}>TOP</strong>?</p>
                    <div className={"w-full bg-back overflow-hidden rounded-lg"}>
                        <Slider
                            images={[
                                // Q1, Q2, Q3, Q4, Q5
                            ]}
                        />
                        <Image src={LeaderboardImage} alt="Prize Route" className="w-full" id="img-shadow"
                        />
                        {/*PRINT LEADER BOARD? SOMETHING WITH FIGHT?*/}
                    </div>
                </LandSection>
            </Reveal>


            {/*INSTRUCTIONS*/}
            <Reveal triggerOnce>
                <LandSection>
                    <h2>
                        The Game
                        <FontAwesomeIcon icon={faDashboard} className="text-primary-foreground inline mx-2 size=7"/>

                    </h2>
                    <ul className="list-disc ml-[12px] px-2 text-start ">
                        <Reveal triggerOnce damping={0.5}>

                            <li>Try to reach the million dollar prize</li>
                        </Reveal>
                        <Reveal triggerOnce damping={2}>

                            <li>You will need to answer 15 questions and the million dollar question</li>
                        </Reveal>
                        <Reveal triggerOnce damping={3.5}>

                            <li>No mistake tolerance</li>
                        </Reveal>
                        <Reveal triggerOnce damping={4}>

                            <li>You have 3 types of help at your disposition</li>
                        </Reveal>
                        <Reveal triggerOnce damping={5.5}>

                            <li>Can you do this?</li>
                        </Reveal>
                    </ul>
                </LandSection>
            </Reveal>


            <Bounce triggerOnce>
                <Link href={isLogged ? "/home" : "/auth?create&previous=home"}>
                    <Button className={"bg-transparent shine-btn shine-btn-gold border my-16"}
                    >
                        Lets Play?
                    </Button>

                </Link>

            </Bounce>
        </div>

    )
}
