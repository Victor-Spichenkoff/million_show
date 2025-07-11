"use client"

import {LoginForm} from "@/components/auth/loginForm";
import {Header} from "@/components/template/header";
import {Footer} from "@/components/template/footer";
import {Suspense, useEffect, useState} from "react";
import Link from "next/link";
import {CreateForm} from "@/components/auth/createForm";
import {useSearchParams} from "next/navigation";
import {AuthPage} from "@/app/auth/authPage";

export default function AuthScreen() {
    return (
        <Suspense>
            <AuthPage/>
        </Suspense>
    )
}
