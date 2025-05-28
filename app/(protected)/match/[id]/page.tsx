"use client"

import {Header} from "@/components/template/header";
import {Helps} from "@/components/match/helps";
import {FullQuestion} from "@/components/match/fullQuestion";

export default function Match() {


    return (<>
        <Header label={"Million Show"} showBackButton showConfig/>
        <main className={"p-2"}>
            {/* bar */}
            <div className="max-w-[500px] mx-auto p-[.8px] bg-question text-white rounded-lg">
                <Helps
                    half={2}
                    skip={3}
                    univer={3}
                />
                <FullQuestion/>
                <FullQuestion/>
                <FullQuestion/>
                <FullQuestion/>

            </div>
            {/* prizes */}
        </main>
    </>)
}
