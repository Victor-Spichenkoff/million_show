// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://million-show-api.onrender.com"

import {getLocalIP} from "@/lib/IP";


export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://${getLocalIP()}:2006`
        : 'https://million-show-api.onrender.com'
