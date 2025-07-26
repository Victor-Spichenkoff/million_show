import {Dispatch, SetStateAction} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {User} from "@/types/user";

interface IdmViewUser {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | User) => void
    user: User
}

export const AdmEditUser = ({ setMode, setEditionEntity, user }:IdmViewUser) => {
    return (
        <div>
            {user.userName}
        </div>
    )
}
