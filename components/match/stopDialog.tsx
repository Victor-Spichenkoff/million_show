import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button";

interface IStopDialog {
    onClick: (e: any) => void
}

export const StopDialog = ({onClick}:IStopDialog) => {
    return (
        <AlertDialog>
            {/*<AlertDialogTrigger>New</AlertDialogTrigger>*/}
            <AlertDialogTrigger asChild><Button variant={"gold"} className={"flex-1"}>STOP</Button></AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will finish your previous match
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onClick} className={"bg-gold text-gray-900 hover:bg-gold/80"}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
