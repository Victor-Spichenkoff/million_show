export const storeLastUsedTime = (newTime: number) => {
    localStorage.setItem("last_start", newTime.toString())
}

export const getStoreLastUsedTime = () => {
    if (process.env.NODE_ENV == "development")
        return null

    const timeStorage = localStorage.getItem("last_start")

    console.log(timeStorage)
    if (!timeStorage)
        return null

    return Number(timeStorage)//erro aqui
}