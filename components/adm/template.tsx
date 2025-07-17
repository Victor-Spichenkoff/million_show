import {AdmModes} from "@/app/(protected)/adm/page";
import {Dispatch, SetStateAction} from "react";

interface IAdmChooseButtons {
    setMode: Dispatch<SetStateAction<AdmModes>>
}

export const AdmButtons = ({ setMode }: IAdmChooseButtons) => {
    return (
        <div></div>
    )
}
