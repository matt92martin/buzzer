const cookie = require('cookie')
const cookieParser = require('cookie-parser')

const parseSignedCookies = (cookies, secret, wanted) => {
    try {
        const parsedCookie = cookie.parse(cookies)[wanted]
        const decodedCookie = decodeURIComponent(parsedCookie)
        return cookieParser.signedCookie(decodedCookie, secret)
    } catch (e) {
        console.error(e)
        return ''
    }
}

module.exports = { parseSignedCookies }
