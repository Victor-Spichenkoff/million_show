import {FLASH_ANIMATION_DURATION} from "@/global";

export const flashGreen = () => {
    document.body.classList.add("bg-flash-green");
    setTimeout(() => {
        document.body.classList.remove("bg-flash-green");
    }, FLASH_ANIMATION_DURATION)
}

export const flashRed = () => {
    document.body.classList.add("bg-flash-red");
    setTimeout(() => {
        document.body.classList.remove("bg-flash-red");
    }, FLASH_ANIMATION_DURATION)
}
