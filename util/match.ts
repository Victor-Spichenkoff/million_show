import {FLASH_ANIMATION_DURATION} from "@/global"
import confetti from "canvas-confetti"

export     const formatPrize = (prize: number) => {
    switch (prize) {
        case 0:
            return 0
        case 1_000_000:
            return "1 MILLION"
        default:
            return `${prize / 1_000} K`
    }
}


export const flashGreen = () => {
    document.body.classList.add("bg-flash-green")
    setTimeout(() => {
        document.body.classList.remove("bg-flash-green")
    }, FLASH_ANIMATION_DURATION)
}

export const flashRed = () => {
    document.body.classList.add("bg-flash-red")
    setTimeout(() => {
        document.body.classList.remove("bg-flash-red")
    }, FLASH_ANIMATION_DURATION)
}

export const flashGold = () => {
    document.body.classList.add("bg-flash-gold")
    setTimeout(() => {
        document.body.classList.remove("bg-flash-gold")
    }, FLASH_ANIMATION_DURATION)
}


const randInt = (min: number, max: number)  => {
    return Math.random() * (max - min) + min
}

export const showConfetti = () => {
    const duration = 9_000
    let animationEnd = Date.now() + duration
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            return clearInterval(interval)
        }

        let particleCount = 50 * (timeLeft / duration)
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randInt(0.1, 0.3), y: Math.random() - 0.2 }
            })
        )
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randInt(0.7, 0.9), y: Math.random() - 0.2 }
            })
        )
    }, 250)
}
