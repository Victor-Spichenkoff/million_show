// export const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://million-show-api.onrender.com"


// need to use the ip on phone
const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

export const baseUrl =
    process.env.NODE_ENV === 'development'
        ? `http://${hostname}:2006`
        : 'https://million-show-api.onrender.com'


export const pageSize = 6
export const totalHelps = 5
export const defaultHelps = {
    skips: 2,
    universitary: 2,
    halfHalf: 1
}

export const HEADER_HEIGHT = 84

// AUTH
// export const autoLoginUserName = ""
// export const autoLoginUserPassword = "12345"
export const autoLoginUserName = process.env.NODE_ENV === 'development' ? "string" : "cool_person"
export const autoLoginUserPassword = process.env.NODE_ENV === 'development' ? "1234" : "12345"



export const FLASH_ANIMATION_DURATION = 2_500
