export const Sleep = async (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export const minuteWithSeconds = (min: number) => {
    const sec = ((min - Math.floor(min)) * 60).toFixed(0)
    return { min: min.toFixed(0), sec }
}
