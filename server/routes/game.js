const { Router } = require('express')
const { makeid } = require('../../util/random')
const { makeDB } = require('../db')
const { Game } = require('../db/models')
const { gameCookieName, cookieName } = require('../../config')
const { createUser } = require('./user')

const router = Router()

// Create game by providing moderator name and moderator password
// returns moderator, moderator password, game passphrase
router.post('/create', async (req, res) => {
    res.clearCookie(cookieName)
    res.clearCookie(gameCookieName)

    const gameOpts = {
        moderator: req.body.moderator ? req.body.moderator.toLowerCase() : undefined,
        moderator_password: req.body.moderatorPassword,
        game_password: makeid(6),
    }

    if (!gameOpts.moderator || !gameOpts.moderator_password || !gameOpts.game_password) {
        return res.status(401).json({ error: 'Enter valid info' })
    }

    // const db = await makeDB()

    try {
        // await db.exec('BEGIN TRANSACTION')
        // const insert = await db.run(
        //     `INSERT INTO game (moderator,moderator_password,game_password)
        //     VALUES ($moderator,$moderator_password,$game_password)`,
        //     opts
        // )
        // await db.exec('COMMIT;')
        // const game = await db.get(
        //     'SELECT rowid, moderator, moderator_password, game_password FROM game WHERE rowid = ?',
        //     insert.lastID
        // )

        const game = await Game.create(gameOpts)
        console.log(game)

        const token = await createUser({ username: game.moderator, moderator: true })
        res.cookie(cookieName, token, { signed: true, sameSite: 'strict' })
        res.cookie(gameCookieName, game.rowid, { signed: true, sameSite: 'strict' })

        res.json({
            game: {
                moderator: game.moderator,
                moderatorPassword: game.moderator_password,
                id: game.rowid,
                gamePassword: game.game_password,
            },
        })
    } catch (e) {
        // await db.exec('ROLLBACK TRANSACTION')
        console.error(e)
        res.status(400).json({ error: 'Something went wrong' })
    } finally {
        // await db.close()
    }
})

router.post('/login', async (req, res) => {
    res.clearCookie(cookieName)
    res.clearCookie(gameCookieName)

    const opts = {
        $moderator: req.body.moderator,
        $moderator_password: req.body.moderatorPassword,
        $game_password: req.body.gamePassword,
    }

    if (!opts.$moderator || !opts.$moderator_password) {
        return res.status(401).json({ error: 'Enter valid info' })
    }

    opts['$moderator'] = opts['$moderator'].toLowerCase()

    const db = await makeDB()

    try {
        const game = await db.get(
            `SELECT rowid, moderator, moderator_password, game_password 
                 FROM game WHERE moderator = $moderator AND moderator_password = $moderator_password AND game_password = $game_password`,
            opts
        )

        const token = await createUser({ username: game.moderator, moderator: true })
        res.cookie(cookieName, token, { signed: true, sameSite: 'strict' })
        res.cookie(gameCookieName, game.rowid, { signed: true, sameSite: 'strict' })

        res.json({
            game: {
                moderator: game.moderator,
                id: game.rowid,
                gamePassword: game.game_password,
            },
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: 'Something went wrong' })
    } finally {
        await db.close()
    }
})

router.post('/', async (req, res) => {
    const gamePassword = req.body.gamePassword
    const db = await makeDB()
    res.clearCookie(gameCookieName)

    try {
        const game = await db.get('SELECT rowid FROM game WHERE game_password = ?', [gamePassword])

        if (game) {
            res.cookie(gameCookieName, game.rowid, { signed: true, sameSite: 'strict' })
            res.json({ id: game.rowid })
        } else {
            throw new Error('Not found')
        }
    } catch (e) {
        console.error(e)
        res.status(404).json({ error: 'Not found' })
    } finally {
        await db.close()
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const cookie = req.signedCookies[gameCookieName]
    if (id === cookie) {
        res.json({ success: true })
    } else {
        res.status(401).json({ error: 'Try the password again' })
    }
})

router.post('/leave', async (req, res) => {
    res.clearCookie(gameCookieName)
    res.clearCookie(cookieName)
    res.json({ success: true })
})

module.exports = router
