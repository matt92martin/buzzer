const { Router } = require('express')
const { cookieName } = require('../../config')
const { jwtVerify } = require('../db/jwt')

const router = Router()

router.use(async (req, res, next) => {
    const cookie = req.signedCookies[cookieName]
    if (cookie) {
        res.locals.user = await jwtVerify(cookie)
    }
    next()
})

const { UserRouter } = require('./user')
router.use('/user', UserRouter)
router.use('/game', require('./game'))

module.exports = router
