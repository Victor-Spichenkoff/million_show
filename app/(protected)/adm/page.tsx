"use client"


import {useAdminOnly} from "@/hooks/useAdminOnly";
import {Loading} from "@/components/template/loading";
import {Header} from "@/components/template/header";
import {useState} from "react";
import {AdmChooseButtons} from "@/components/adm/AdmButtons";
import {AdmViewUsers} from "@/components/adm/admViewUsers";


export type AdmModes = "none"  | "viewUsers" | "viewQuestions" | "editUsers" | "editQuestions"

    export default function AdmPage() {
    const [mode, setMode] = useState<AdmModes>("none")
    //TODO: UNCOMMENT
    // const { isUnlocked } = useAdminOnly()
    // if(!isUnlocked)
    //     return <Loading />



    return (
        <div>
            <Header label={"ADMIN"}  showBackButton showConfig/>
            <AdmChooseButtons setMode={setMode} />
            { mode == "viewUsers" && <AdmViewUsers setMode={setMode} />}
        </div>
    )
}
