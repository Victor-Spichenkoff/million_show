import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from "../utils/themeToggle";
import {LogoutButton} from "@/components/utils/logoutButton";
import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import {GetConfigStorage, UpdateConfigStorage} from "@/storage/localStorage/config";
import {ConfigStorage} from "@/types/storage/config";

interface IConfigDropDown {
    hideLogout?: boolean
}

export const ConfigDropDown = ({hideLogout}: IConfigDropDown) => {
    const [config, setConfig] = useState<null | ConfigStorage>(null)

    useEffect(() => {
        if (typeof window == "undefined") return

        const currentConfig = GetConfigStorage()
        setConfig(currentConfig)
    }, [])


    const handleLangChange = () => {
        const final = {...config, isPortuguese: !config?.isPortuguese}
        UpdateConfigStorage(final)
        setConfig(final)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FontAwesomeIcon icon={faGear}
                                 className="text-gold animate-in-out duration-500 hover:rotate-180 focus:rotate-90"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Config</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem><ThemeToggle useLabel useFullSize/> </DropdownMenuItem>
                <DropdownMenuItem>
                    <Switch
                        checked={config?.isPortuguese}
                        onCheckedChange={handleLangChange}
                        className={"data-[state=unchecked]:bg-red-600 dark:data-[state=unchecked]:bg-red-700" +
                            " data-[state=checked]:bg-emerald-600 dark:data-[state=checked]:bg-emerald-700"}
                    />
                    Portuguese
                </DropdownMenuItem>
                {!hideLogout && (
                    <DropdownMenuItem><LogoutButton useFullSize/></DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
