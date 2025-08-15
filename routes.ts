export const publicRoutes = [
    "/",
    "/auto-login",
]

export const protectedRoutes = [
    "/home",
    "/me",
    "/adm",
    "/leaderboard",
    "/match",
    "/history",
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth",
    "/auto-login"
]

export const getLoginPathnameWithPreviousUrl = (previous?: string) => {
    if(!previous)
     return  "/auth?loginError=true"

    return `/auth?loginError=true&previous=${previous}`
}


export const imageSuffix = [".jpg", ".png"]

export const isImagePath = (path: string) => {
    for(let suffix of imageSuffix)
        if(path.endsWith(suffix))
            return true
    return false
}
