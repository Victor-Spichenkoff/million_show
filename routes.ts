export const publicRoutes = [
    "/",
]

export const protectedRoutes = [
    "/home",
    "/me"
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth"
]

export const getLoginPathnameWithPreviousUrl = (previous?: string) => {
    if(!previous)
     return  "/auth?loginError=true"

    return `/auth?loginError=true&previous=${previous}`
}
