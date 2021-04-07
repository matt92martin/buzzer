const { cookieName, gameCookieName } = require('../../config')

const setLocals = async (req, res, next) => {
    const userId = req.signedCookies[cookieName]
    const gameId = req.signedCookies[gameCookieName]

    if (userId) {
        res.locals.user = userId
    }
    if (gameId) {
        res.locals.game = gameId
    }
    next()
}

module.exports = setLocals
