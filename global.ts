// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://million-show-api.onrender.com"


// need to use the ip on phone
const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://${hostname}:2006`
        : 'https://million-show-api.onrender.com'
