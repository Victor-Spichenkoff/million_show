"use client"


import {Loading} from "@/components/template/loading";
import {Header} from "@/components/template/header";
import {useEffect, useState} from "react";
import {AdmChooseButtons} from "@/components/adm/AdmButtons";
import {AdmViewUsers} from "@/components/adm/admViewUsers";
import {AdmViewQuestions} from "@/components/adm/admViewQuestions";
import {Question} from "@/types/responses/question";
import {User} from "@/types/user";
import {AdmViewUser} from "@/components/adm/admViewUser";


export type AdmModes =
    "none"
    | "viewUsers"
    | "viewQuestions"
    | "editUsers"
    | "editQuestions"
    | "addUser"
    | "addQuestion"

export default function AdmPage() {
    const [mode, setMode] = useState<AdmModes>("none")
    const [editionEntity, setEditionEntity] = useState<null | User | Question>(null)
    const [globalIsLoading, setGlobalIsLoading] = useState(false)
    //TODO: UNCOMMENT
    // const { isUnlocked } = useAdminOnly()
    // if(!isUnlocked)
    //     return <Loading />

    useEffect(() => {
        document.getElementsByTagName("body")[0].classList.add("adm")
        document.getElementsByTagName("html")[0].classList.add("adm")
    }, [])

    return (
        <div className={"px-2 md:px-0 pb-12"}>
            {globalIsLoading && <Loading/>}
            <Header label={"ADMIN"} showBackButton showConfig/>
            <AdmChooseButtons setMode={setMode} mode={mode}/>
            {mode == "viewUsers" && <AdmViewUsers setMode={setMode}/>}
            <div key={mode}>
                {mode === 'viewQuestions' && <AdmViewQuestions
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    setGlobalIsLoading={setGlobalIsLoading}
                />}
                {/*{mode === 'editUsers' && <EditUsers/>}*/}
            </div>

            {/*<AdmViewQuestions*/}
            {/*    setMode={setMode}*/}
            {/*    setEditionEntity={setEditionEntity}*/}
            {/*    setGlobalIsLoading={setGlobalIsLoading}*/}
            {/*/>            */}

            <AdmViewUser
                setMode={setMode}
                setEditionEntity={setEditionEntity}
                setGlobalIsLoading={setGlobalIsLoading}
            />
        </div>
    )
}
