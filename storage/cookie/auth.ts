"use server"

import {cookies} from "next/headers";

export const saveAccessToken = async (accessToken: string, expiresAt: Date) => {
    const cookieStore = await cookies()
    cookieStore.set('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
    })
}

export const getAccessToken = async () => {
    const cookieStore = await cookies()
    return cookieStore.get('access_token')
}


export const logout = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
}
