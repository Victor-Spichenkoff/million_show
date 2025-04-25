"use client"

import { useState } from "react"
import { GameInstructions } from "../utils/intructions/gameInstruction"

export const DropInstructions = () => {
    const [show, setShow] = useState(false)



    return (
        <section className="bg-primary rounded-lg overflow-hidden transition-all duration-150 drop-area-container">
            <div className="">
                <button onClick={() => setShow(!show)} className="p-2 cursor-pointer hover:bg-primary/90 block w-full">
                    {show ? "Show less" : "Lean more"}
                </button>
                <div className={`h-0 flex ${show && "drop-area-full"} flex-col`}>
                    <GameInstructions />
                </div>
            </div>
        </section>
    )
}
