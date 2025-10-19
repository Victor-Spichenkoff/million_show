import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {authRoutes, getLoginPathnameWithPreviousUrl, isImagePath, protectedRoutes, publicRoutes} from "@/routes"


export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    // const isProtected = protectedRoutes.includes(pathname)
    const isPublic = publicRoutes.includes(pathname)
    const isAuth = authRoutes.includes(pathname)

    if(isPublic || isImagePath(pathname))
         return NextResponse.next()
    // if(!isProtected && !isAuth)
    //      return NextResponse.next()

    const token = request.cookies.get('access_token')?.value

    if(isAuth) {
        const homeUrl = new URL('/home', request.url)
        if (token)
            return NextResponse.redirect(homeUrl)

        return NextResponse.next()
    }

    // it is protected:
    if (!token) {
        const loginUrl = new URL(getLoginPathnameWithPreviousUrl(pathname), request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico|.jpg|.png).*)'],
}
