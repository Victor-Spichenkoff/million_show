export type User = {
    id: number
    userName: string
    password: string
    role: UserRoles
    matchs?: any[]
    historics?: any[]
}

export type UserRoles = "normal" | "adm"
