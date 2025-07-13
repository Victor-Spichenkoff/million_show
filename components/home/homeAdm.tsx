import Link from "next/link";
import {getAccessToken} from "@/storage/cookie/auth";
import {GetUserStorage} from "@/storage/localStorage/user";

export const HomeAdm = async () => {
    const user = GetUserStorage()

    if(!user)
        return null

    return (
        <Link href={"/adm"} className={"inline-block bg-success/80 text-white"}>
            <div>
                Adminitration
            </div>
        </Link>
    )
}
