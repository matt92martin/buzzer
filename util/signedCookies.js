const cookie = require('cookie')
const cookieParser = require('cookie-parser')

const parseSignedCookies = (cookies, secret, wanted) => {
    try {
        const parsedCookie = cookie.parse(cookies)[wanted]
        const decodedCookie = decodeURIComponent(parsedCookie)
        return cookieParser.signedCookie(decodedCookie, secret)
        // const wantedCookiesObj = {}
        // let temp
        // for (let c in parsedCookies) {
        //     if (wanted.indexOf(c) !== -1) {
        //         temp = decodeURIComponent(parsedCookies[c])
        //         wantedCookiesObj[c] =
        //     }
        // }
        // return wantedCookiesObj
    } catch (e) {
        console.log(e)
        return undefined
    }
}

module.exports = { parseSignedCookies }
