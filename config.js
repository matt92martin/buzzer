module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieName: 'userToken',
    PORT: process.env.PORT,
    gameCookieName: 'gameCookie',
}
