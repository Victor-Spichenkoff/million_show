import {CircularProgress} from "@mui/material";

interface ILoading {
    isDisplayBlock?: boolean
    size?: number
}

export const Loading = ({isDisplayBlock, size}: ILoading) => {
    return (
        <div className={`${!isDisplayBlock && " h-screen w-screen bg-black/50 fixed "} top-0 left-0 z-50 " +
            " flex justify-center items-center`}>
            <CircularProgress size={size ?? 70}/>
        </div>
    )
}
