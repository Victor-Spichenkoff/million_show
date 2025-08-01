import {Dispatch, SetStateAction} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/ui/button";
import {HighLightOnQuery} from "@/components/utils/highLightOnQuery";

interface IAdmViewItem {
    id: number
    label: string
    extra: string
    setEditionEntityAction: () => void
    handleDeleteAction: () => void
    setAdmModeAction: () => void
    query: string
}

export const AdmViewItem = ({
                                handleDeleteAction,
                                setAdmModeAction,
                                setEditionEntityAction,
                                id,
                                extra,
                                label,
                                query
                            }: IAdmViewItem) => {

    const handleEditClick = () => {
        setEditionEntityAction()
        setAdmModeAction()
    }

    return (
        <div
            className={"grid grid-cols-[30px_1fr_auto] border border-sky-800 rounded-md w-full min-w-[500px] text-sm " +
                "text-text font-bold text-base darK:bg- overflow-hidden"}>
            <div className="flex items-center justify-center px-2 py-2 bg-sky-800 text-white font-semibold">
                <HighLightOnQuery
                    text={id.toString()}
                    searchQuery={query}
                />
                {/*{id}*/}
            </div>

            <div className="flex justify-between items-center relative px-4 py-2 bg-hint/80">
                <div className="adm-view_label w-[48%] min-w-0 overflow-hidden line-clamp-2 pr-4">
                    <HighLightOnQuery
                        text={label}
                        searchQuery={query}
                    />
                    {/*{label}*/}
                </div>
                <div className="w-[48%] min-w-0 overflow-hidden line-clamp-2 pl-4">
                    {extra}
                </div>
            </div>

            <div className="flex items-center gap-x-2 px-2 py-2 border-l border-sky-800 bg-sky-100 dark:bg-sky-800/80">
                <Button onClick={handleEditClick} variant="success">
                    <FontAwesomeIcon icon={faPen}/>
                </Button>
                <Button variant="error" onClick={handleDeleteAction}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </div>

        </div>


        // <div className={"flex justify-around item-center border-2 border-sky-800 " +
        //     "px-2 py-1 gap-x-4 w-full min-w-[500px] text-sm lg:text-lg"}>
        //     <div className={"min-w-5 max-w-[30px] flex items-center"}>
        //         {id}
        //     </div>
        //     <div className={"w-full flex justify-between items-center relative"}>
        //         <div className={"adm-view_label w-[45%] min-w-0 overflow-hidden line-clamp-2"}>
        //             {label}
        //         </div>
        //         <div className={"w-[45%] min-w-0 overflow-hidden line-clamp-2"}>
        //             {extra}
        //         </div>
        //     </div>
        //     <div className={"flex items-center gap-x-1"}>
        //         <Button
        //             onClick={handleEditClick}
        //             variant={"outline-highlight"}
        //
        //
        //         ><FontAwesomeIcon icon={faPen}/></Button>
        //         <Button
        //             variant={"error"}
        //             onClick={handleDeleteAction}
        //         ><FontAwesomeIcon icon={faTrash}/></Button>
        //     </div>
        // </div>
    )
}
