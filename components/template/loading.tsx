import {CircularProgress} from "@mui/material";

export const Loading = () => {
    return (
        <div className={"h-screen w-screen bg-black/50 fixed top-0 left-0 z-50 " +
            "flex justify-center items-center"}>
            <CircularProgress size={70}/>
        </div>
    )
}
