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
]

export const getLoginPathnameWithPreviousUrl = (previous?: string) => {
    if(!previous)
     return  "/auth/login?loginError=true"

    return `/auth/login?loginError=true&previous=${previous}`
}
