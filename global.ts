// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://million-show-api.onrender.com"


// need to use the ip on phone
const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://${hostname}:2006`
        : 'https://million-show-api.onrender.com'


export const HEADER_HEIGHT = 84

// AUTH
// export const autoLoginUserName = "cool_person"
// export const autoLoginUserPassword = "12345"
export const autoLoginUserName = "string"
export const autoLoginUserPassword = "1234"



export const FLASH_ANIMATION_DURATION = 2_500
