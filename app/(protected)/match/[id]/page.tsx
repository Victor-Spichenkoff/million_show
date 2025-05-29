"use client"

import {Header} from "@/components/template/header";
import {Helps} from "@/components/match/helps";
import {FullQuestion} from "@/components/match/fullQuestion";

export default function Match() {


    return (<>
        <Header label={"Million Show"} showBackButton showConfig/>
        <main className={"p-2"}>
            {/* bar */}
            <div className="max-w-[500px] mx-auto text-white rounded-lg">
                <div className={"bg-question p-[.8px] rounded-lg"}>
                    <Helps
                        half={2}
                        skip={3}
                        univer={3}
                    />
                </div>
                <FullQuestion/>
            </div>
            {/* prizes */}
        </main>
    </>)
}
