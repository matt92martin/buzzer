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

router.use('/user', require('./user'))

module.exports = router
