const { Router } = require('express')
const { cookieName, gameCookieName } = require('../../config')
const { jwtVerify } = require('../db/jwt')

const router = Router()

router.use(async (req, res, next) => {
    const cookie = req.signedCookies[cookieName]
    const gameCookie = req.signedCookies[gameCookieName]

    if (cookie) {
        res.locals.user = await jwtVerify(cookie)
    }
    if (gameCookie) {
        res.locals.game = await jwtVerify(gameCookie)
    }
    next()
})

router.use('/user', require('./user').UserRouter)
router.use('/game', require('./game'))

module.exports = router
