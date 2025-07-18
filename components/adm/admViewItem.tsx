import {Dispatch, SetStateAction} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/ui/button";

interface IAdmViewItem {
    id: number
    label: string
    extra: string
    setEditionEntityAction: () => void
    handleDeleteAction: () => void
    setAdmModeAction: () => void
    // setAdmModeAction: Dispatch<SetStateAction<AdmModes>>
}

export const AdmViewItem = ({
                                handleDeleteAction,
                                setAdmModeAction,
                                setEditionEntityAction,
                                id,
                                extra,
                                label
                            }: IAdmViewItem) => {

    const handleEditClick = () => {
        setEditionEntityAction()
        setAdmModeAction()
    }

    return (
        <div className={"flex justify-around item-center border-2 border-sky-800 px-2 py-1 w-full min-w-[500px] text-sm lg:text-lg"}>
            <div className={"min-w-5"}>
                {id}
            </div>
            <div className={"w-full flex justify-between px-4"}>

                <div className={"w-[45%] truncate bg-red-200"}>
                    {label}
                </div>
                <div className={"w-[45%]  truncate"}>
                    {extra}
                </div>
            </div>
            <div className={"flex"}>
                <Button
                    onClick={handleEditClick}
                    variant={"destructive"}

                ><FontAwesomeIcon icon={faPen}/></Button>
                <Button
                    onClick={handleDeleteAction}

                ><FontAwesomeIcon icon={faTrash}/></Button>
            </div>

        </div>
    )
}
