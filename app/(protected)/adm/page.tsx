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
import {baseAdmCreateUser, baseAdmQuestion} from "@/util/addDefaultData";


export type AdmModes =
    "none"
    | "viewUsers"
    | "viewQuestions"
    | "editUsers"
    | "editQuestions"
    | "addUser"
    | "addQuestion"

export default function AdmPage() {
    const [mode, setMode] = useState<AdmModes>("viewQuestions")
    const [editionEntity, setEditionEntity] = useState<null | User | Question>(null)
    const [globalIsLoading, setGlobalIsLoading] = useState(false)

    const { isUnlocked } = useAdminOnly()

    useEffect(() => {
        document.getElementsByTagName("body")[0].classList.add("adm")
        document.getElementsByTagName("html")[0].classList.add("adm")
    }, [])

    if (!isUnlocked)
        return <Loading/>


    return (
        <div className={"px-2 pl-2 pb-12"}>
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
                {mode == "addQuestion" && <AdmEditQuestion
                    setMode={setMode}
                    setEditionEntity={setEditionEntity}
                    question={baseAdmQuestion}
                    setGlobalIsLoading={setGlobalIsLoading}
                    isAdd
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

                {mode === "none" && (
                    // <div className="m-16 flex flex-col items-center justify-center h-full text-center space-y-4">
                    //     <h2 className="text-3xl font-bold text-gray-300">Welcome to the Admin Dashboard</h2>
                    //     <h3 className="text-lg text-gray-400/80 max-w-xl">
                    //         Select one of the categories above to start managing the game data.
                    //     </h3>
                    // </div>


                    <div className="flex items-center justify-center h-full p-6">
                        <div className="border-3 border-highlight bg-highlight/50 rounded-xl shadow-lg p-8 text-center max-w-lg">
                            <h2 className="text-3xl font-bold text-primary-foreground/90 mb-3">Admin Dashboard</h2>
                            <p className="text-gray-700 dark:text-gray-400">
                            {/*    <h2 className="text-3xl font-bold text-gray-300 mb-3">Welcome to the Admin Dashboard</h2>*/}
                            {/*<p className="text-gray-400/95">*/}
                                Select one of the categories above to start managing the game data.
                            </p>
                        </div>
                    </div>


                )}
            </div>
        </div>
    )
}
