import {useEffect, useState} from "react";
import {GetConfigStorage, UpdateConfigStorage} from "@/storage/localStorage/config";

interface IUseAdmIsPortuguese {
    currentPage: number
}

type PageForLang = {
    pageForEn: number
    pageForPt: number
}

export const useAdmIsPortuguese = ({currentPage}: IUseAdmIsPortuguese) => {
    const config = GetConfigStorage()
    const [isPortuguese, setIsEnglish] = useState(config?.isPortuguese)
    const [lastPageForIdiom, setLastPageForIdiom] = useState<PageForLang>({
        pageForEn: 0,
        pageForPt: 0,
    })

    useEffect(() => {
        UpdateConfigStorage({...config, isPortuguese: isPortuguese ?? false})

        setLastPageForIdiom(prev => {
            //TODO: ACHO QUE DEVE INVERTER
            prev[isPortuguese ? "pageForEn" : "pageForPt"] = currentPage
            return {...prev}
        })
    }, [isPortuguese])

    const IsAdmComponent = () => (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                onChange={() => setIsEnglish(!isPortuguese)}
                type="checkbox"
                checked={isPortuguese}
                className="appearance-none w-5 h-5 border border-gray-400 rounded-sm checked:bg-sky-800 checked:border-transparent checked:before:content-['✓'] checked:before:text-white checked:before:block checked:before:text-center"
            />
            <span>Portuguese</span>
        </label>
    )

    return {IsAdmComponent, isPortuguese, lastPageForIdiom, setLastPageForIdiom}
}
