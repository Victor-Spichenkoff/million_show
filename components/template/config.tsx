import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from "../utils/themeToggle";
import {LogoutButton} from "@/components/utils/logoutButton";

export const ConfigDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FontAwesomeIcon icon={faGear} className="text-gold animate-in-out duration-500 hover:rotate-180 focus:rotate-90"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Config</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><ThemeToggle useLabel useFullSize/> </DropdownMenuItem>
                <DropdownMenuItem><LogoutButton useFullSize /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}