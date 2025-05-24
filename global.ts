// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://million-show-api.onrender.com"

import {getLocalIP} from "@/lib/IP";
const ip = getLocalIP()
console.log(ip)
export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://${ip}:2006`
        : 'https://million-show-api.onrender.com'
