import {AdmModes} from "@/app/(protected)/adm/page";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";

interface IAdmChooseButtons {
    setMode: Dispatch<SetStateAction<AdmModes>>
    mode: AdmModes
}

export const AdmChooseButtons = ({setMode, mode}: IAdmChooseButtons) => {
    const handleEditQuestionClick = () => {
        setMode(c => {
            if (c != "viewQuestions" && c != "editQuestions")
                return "viewQuestions"
            return "none"
        })
    }

    const handleEditUserClick = () => {
        setMode(c => {
            if (c != "viewUsers" && c != "editUsers")
                return "viewUsers"
            return "none"
        })
    }

    const handleAddUserClick = () => {
        setMode(c => {
            if (c != "addUser")
                return "addUser"
            return "none"
        })
    }

    const handleAddQuestionClick = () => {
        setMode(c => {
            if (c != "addQuestion")
                return "addQuestion"
            return "none"
        })
    }
    let userButtonLabel = "View Users"
    let questionButtonLabel = "View Questions"
    switch (mode) {
        case "editUsers":
            userButtonLabel = "Edit User";
            break;
        case "editQuestions":
            questionButtonLabel = "Edit Questions";
            break;
        default:
            break;
    }

    return (
        <div className={"flex justify-between max-w-max_w_question mx-auto"}>
            <div>
                <Button
                    onClick={handleEditUserClick}
                    variant={"outline-success"}
                    className={`${mode == "editUsers" || mode == "viewUsers" && "bg-success"}`}
                > {userButtonLabel}</Button>
                <Button
                    onClick={handleAddUserClick}
                    variant={"outline-highlight"}
                    className={`${mode == "addUser" && "bg-highlight"} ml-4`}
                >+</Button>
            </div>
            <div>

                <Button
                    onClick={handleEditQuestionClick}
                    variant={"outline-success"}
                    className={`${mode == "editQuestions" || mode == "viewQuestions" && "bg-success"} `}
                >{questionButtonLabel}</Button>
                <Button
                    onClick={handleAddQuestionClick}
                    variant={"outline-highlight"}
                    className={`${mode == "addQuestion" && "bg-highlight"} ml-4`}
                >+</Button>
            </div>
        </div>
    )
}
