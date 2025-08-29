"use client"

import {Suspense, useEffect, useState} from "react";
import {AuthPage} from "@/app/auth/authPage";
import {clearAllCache, } from "@/util/cache";

export default function AuthScreen() {
    clearAllCache()
    clearAllCache()

    return (
        <Suspense>
            <AuthPage/>
        </Suspense>
    )
}
