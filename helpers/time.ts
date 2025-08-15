export const Sleep = async (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export const minuteWithSeconds = (min: number) => {
    const sec = ((min - Math.floor(min)) * 60).toFixed(0)
    return {min: min.toFixed(0), sec}
}

// the larger measure and the smaller measure
export const getLargeAndSmallTime = (timeInMinute: number) => {
    if (timeInMinute < 60) {
        const time = minuteWithSeconds(timeInMinute)
        return {larger: time.min, smaller: time.sec, largerLabel: "m", smallerLabel: "s"}
    } else if (timeInMinute < 60 * 24) {//hour, min
        const minutes = (Math.floor(timeInMinute % (60))).toFixed(0)
        return {larger: (timeInMinute / 60).toFixed(0), smaller: minutes, largerLabel: "h", smallerLabel: "m"}
    } else if (timeInMinute < 60 * 24 * 30) {//day, hour
        const hours = (Math.floor(timeInMinute % (60 * 24)) / 60).toFixed(0)
        return {larger: (timeInMinute / 60 / 24).toFixed(0), smaller: hours, largerLabel: "d", smallerLabel: "h"}
    } else if (timeInMinute < 60 * 24 * 30 * 12) {// month, day
        const days = (Math.floor(timeInMinute % (60 * 24 * 30)) / (60 * 24)).toFixed(0)
        return {larger: (timeInMinute / 60 / 24 / 30).toFixed(0), smaller: days, largerLabel: "m", smallerLabel: "d"}
    } else {
        const month = (Math.floor(timeInMinute % (60 * 24 * 30  * 12)) / (60 * 24 * 30)).toFixed(0)
        return {larger: (timeInMinute / 60 / 24 / 30 / 12).toFixed(0), smaller: month, largerLabel: "y", smallerLabel: "m"}
    }
}


export const getTimeDiffInMinutes = (time1: number, time2: number) => {
    const diffMs = Math.abs(time1 - new Date(time2).getTime())

    return diffMs / 60_000
}
