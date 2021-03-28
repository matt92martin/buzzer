const { Router } = require('express')
const { cookieName } = require('../../config')
const { jwtSign } = require('../db/jwt')
const { v4: uuidV4 } = require('uuid')

const router = Router()

const createUser = async ({ username, color, moderator, uuid }) => {
    return await jwtSign({ username, uuid, color, moderator })
}

router.post('/name', async (req, res) => {
    let { username, color } = req.body

    const uuid = uuidV4()
    const token = await createUser({ username, color })

    res.cookie(cookieName, token, { signed: true, sameSite: 'strict' })
    res.json({ success: true, user: { username, color, uuid } })
})

router.get('/name', (req, res) => {
    const user = res.locals.user
    if (user) {
        res.json({ username: user.username, uuid: user.uuid, color: user.color })
    } else {
        res.json({ username: undefined, uuid: undefined, color: undefined })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie(cookieName)
    res.json({ success: true })
})

module.exports = { UserRouter: router, createUser }
