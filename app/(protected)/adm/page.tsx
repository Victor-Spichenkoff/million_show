"use client"


import {Loading} from "@/components/template/loading";
import {Header} from "@/components/template/header";
import {useEffect, useState} from "react";
import {AdmChooseButtons} from "@/components/adm/AdmButtons";
import {AdmViewQuestions} from "@/components/adm/admViewQuestions";
import {Question} from "@/types/responses/question";
import {User} from "@/types/user";
import {AdmViewUser} from "@/components/adm/admViewUser";
import {AdmEditUser} from "@/components/adm/admEditUser";
import {useAdminOnly} from "@/hooks/useAdminOnly";
import {AdmEditQuestion} from "@/components/adm/admEditQuestion";
import {baseAdmCreateUser} from "@/util/addDefaultData";


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
    const isUnlocked = true

    useEffect(() => {
        document.getElementsByTagName("body")[0].classList.add("adm")
        document.getElementsByTagName("html")[0].classList.add("adm")
    }, [])

    if (!isUnlocked)
        return <Loading/>


    return (
        <div className={"px-2 md:px-0 pb-12"}>
            {globalIsLoading && <Loading/>}
            <Header label={"ADMIN"} showBackButton showConfig/>
            <div className={"mb-8"}>

                <AdmChooseButtons setMode={setMode} mode={mode}/>
            </div>
            <div key={mode}>
                {mode === 'viewQuestions' && <AdmViewQuestions
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    setGlobalIsLoading={setGlobalIsLoading}
                />}
                {mode === 'editQuestions' && <AdmEditQuestion
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    question={editionEntity as any}
                    setGlobalIsLoading={setGlobalIsLoading}
                />}
                {mode === 'viewUsers' && <AdmViewUser
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    setGlobalIsLoading={setGlobalIsLoading}
                />}
                {mode === 'editUsers' && <AdmEditUser
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    user={editionEntity as any}
                    setGlobalIsLoading={setGlobalIsLoading}
                />}
                {mode == "addUser" && <AdmEditUser
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    user={baseAdmCreateUser}
                    setGlobalIsLoading={setGlobalIsLoading}
                    isAdd
                />}

                {mode === "none" && <AdmViewQuestions
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    setGlobalIsLoading={setGlobalIsLoading}
                />}
            </div>
        </div>
    )
}
