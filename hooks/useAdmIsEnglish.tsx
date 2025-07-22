import {useEffect, useState} from "react";
import {GetConfigStorage, UpdateConfigStorage} from "@/storage/localStorage/config";

export const useAdmIsPortuguese = () => {
    const config = GetConfigStorage()
    const [isPortuguese, setIsEnglish] = useState(config?.isPortuguese)


    useEffect(() => {
        UpdateConfigStorage({ ...config, isPortuguese: isPortuguese ?? false })
    }, [isPortuguese])

    const IsAdmComponent = () => (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                onChange={()=> setIsEnglish(!isPortuguese)}
                type="checkbox"
                checked={isPortuguese}
                className="appearance-none w-5 h-5 border border-gray-400 rounded-sm checked:bg-sky-800 checked:border-transparent checked:before:content-['✓'] checked:before:text-white checked:before:block checked:before:text-center"
            />
            <span>Portuguese</span>
        </label>
    )

    return {IsAdmComponent, isPortuguese}
}
