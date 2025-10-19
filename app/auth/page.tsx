"use client"

import {Suspense} from "react";
import {AuthPage} from "@/app/auth/authPage";
import {clearAllCache, } from "@/util/cache";

export default function AuthScreen() {
    clearAllCache()

    return (
        <Suspense>
            <AuthPage/>
        </Suspense>
    )
}
