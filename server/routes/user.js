const { Router } = require('express')
const { cookieName } = require('../../config')
const db = require('../../models')

const router = Router()

const { User } = db

router.post('/name', async (req, res) => {
    let { username, color, gameId } = req.body
    const user = await User.create({ username, color, gameId })

    res.cookie(cookieName, user.id, { signed: true, sameSite: 'strict' })
    res.json({ username, color, id: user.id })
})

module.exports = { UserRouter: router }
