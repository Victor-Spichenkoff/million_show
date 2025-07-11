"use client"

import {ConnectionTest} from "@/components/utils/connectionTest";
import {Header} from "@/components/template/header";
import {Suspense, useEffect, useState} from "react";
import {useAutoLogin} from "@/hooks/useAutoLogin";
import {toast} from "sonner";
import {Loading} from "@/components/template/loading";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {LoginDialog} from "@/components/autoLogin/loginDialog";
import {useIsLogged} from "@/hooks/useIsLogged";
import {AutoLoginPage} from "@/app/auto-login/autoLoginPage";

export default function AutoLogin() {
    return (
        <Suspense>
            <AutoLoginPage />
        </Suspense>
    )
}
