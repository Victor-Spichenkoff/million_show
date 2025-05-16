import {useEffect, useState} from "react";
import {getExpiresAt} from "@/storage/cookie/auth";

export const useIsLogged = () => {
    const [isLogged, setIsLogged] = useState(false)

    useEffect( () => {
        (async ()=>{
            const expiresAt: any = await getExpiresAt()
            if(new Date(expiresAt?.value) > new Date())
                return setIsLogged(true)
            
            return setIsLogged(false)
        })()
    }, [])


    return isLogged
}
