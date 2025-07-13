import {UserRoles} from "@/types/user";

export type LoginResponse = {
    id: number
    userName: string
    role: UserRoles
    access_token: string
    expires_in: number
}
