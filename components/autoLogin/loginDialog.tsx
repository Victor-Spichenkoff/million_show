import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {autoLoginUserName, autoLoginUserPassword} from "@/hooks/useAutoLogin";

interface ILoginDialog {
    onClick: () => void
}

export const LoginDialog = ({onClick}: ILoginDialog) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button variant={"gold"}>Create</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Account Creation?</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>
                            <div>We'll create a account with username <span
                                className={"text-gold"}>{autoLoginUserName}</span></div>
                            <div>and password <span className={"text-gold"}>{autoLoginUserPassword}</span></div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onClick}
                                       className={"bg-gold text-gray-900 hover:bg-gold/80"}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
