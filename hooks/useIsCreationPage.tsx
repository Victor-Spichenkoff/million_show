import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export const uesIsCreationPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    const searchParams = useSearchParams()


    useEffect(() => {
        if (searchParams.has("create"))
            setIsLogin(false)
    }, [])

    return { isLogin, setIsLogin }
}
