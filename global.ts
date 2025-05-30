// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://million-show-api.onrender.com"

import {getLocalIP} from "@/lib/IP";
const ip = getLocalIP()
const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
console.log(hostname)
export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://${hostname}:2006`
        : 'https://million-show-api.onrender.com'
