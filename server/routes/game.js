const { Router } = require('express')
const { makeid } = require('../../util/random')
const { jwtVerify } = require('../db/jwt')
const db = require('../../models')
const { gameCookieName, cookieName } = require('../../config')
const { createUser } = require('./user')
const axios = require('axios')
const { wait } = require('../../util/general')

const router = Router()

const { Game, Question } = db

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

    try {
        const game = await Game.create(gameOpts)

        const token = await createUser({ username: game.moderator, moderator: true })
        res.cookie(cookieName, token, { signed: true, sameSite: 'strict' })
        res.cookie(gameCookieName, game.id, { signed: true, sameSite: 'strict' })

        res.json({
            moderator: game.moderator,
            moderatorPassword: game.moderator_password,
            id: game.id,
            gamePassword: game.game_password,
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: 'Something went wrong' })
    }
})

router.post('/login', async (req, res) => {
    res.clearCookie(cookieName)
    res.clearCookie(gameCookieName)

    const gameOpts = {
        moderator: req.body.moderator ? req.body.moderator.toLowerCase() : undefined,
        moderator_password: req.body.moderatorPassword,
    }

    if (!gameOpts.moderator || !gameOpts.moderator_password) {
        return res.status(401).json({ error: 'Enter valid info' })
    }

    try {
        const game = await Game.findOne({ where: gameOpts })

        const token = await createUser({ username: game.moderator, moderator: true })
        res.cookie(cookieName, token, { signed: true, sameSite: 'strict' })
        res.cookie(gameCookieName, game.id, { signed: true, sameSite: 'strict' })

        res.json({
            game: {
                moderator: game.moderator,
                id: game.id,
                gamePassword: game.game_password,
            },
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: 'Something went wrong' })
    }
})

router.post('/leave', async (req, res) => {
    res.clearCookie(gameCookieName)
    res.clearCookie(cookieName)
    res.json({ success: true })
})

router.post('/questions', async (req, res) => {
    const categories = req.body.categories

    if (categories.length > 20) {
        return res.status(500).json({ error: 'Too many categories!' })
    }
    const maxQuestions = Math.max(...categories.map((c) => c.amount))

    if (maxQuestions > 10) {
        return res.status(500).json({ error: 'You have too many questions per category!2' })
    }

    const gameId = req.signedCookies[gameCookieName]

    let questions = []

    try {
        for (let category of categories) {
            const params = {
                amount: category.amount,
                category: category.categoryId,
                difficulty: category.difficulty,
                type: 'multiple',
            }

            const res = await axios.get('https://opentdb.com/api.php', { params }).then((res) =>
                res.data.results.map((q) => {
                    return {
                        category: q.category,
                        question: q.question,
                        gameId: gameId,
                        type: q.type,
                        difficulty: q.difficulty,
                        correct_answer: q.correct_answer,
                        bad_answers: q.incorrect_answers.join('||'),
                    }
                })
            )

            questions = questions.concat(res)
            await wait(500)
        }

        const savedQuestions = await Question.bulkCreate(questions)
        res.json(savedQuestions)
    } catch (e) {
        console.error(e)
    }
})

router.get('/questions', async (req, res) => {
    const opts = req.body.question
    const gameId = req.signedCookies[gameCookieName]

    const questions = await Question.findAll({ where: { gameId, ...opts } })

    res.json(questions)
})

router.put('/question/:id', async (req, res) => {
    const id = +req.params.id
    const gameId = +req.signedCookies[gameCookieName]
    const user = await jwtVerify(req.signedCookies[cookieName])

    console.log({ id, gameId })
    if (user?.moderator) {
        const question = await Question.update(
            { answered: true },
            {
                where: {
                    id,
                    gameId,
                },
            }
        )

        if (question[0] > 0) {
            const updatedQuestion = await Question.findOne({ where: { id } })
            return res.json({ error: false, question: updatedQuestion })
        }
    }
    res.status(401).json({ error: "You don't have the ability to do that!" })
})

router.post('/', async (req, res) => {
    const gamePassword = req.body.gamePassword
    res.clearCookie(gameCookieName)

    try {
        const game = await Game.findOne({ where: { game_password: gamePassword } })

        if (game) {
            res.cookie(gameCookieName, game.id, { signed: true, sameSite: 'strict' })
            res.json({ id: game.id })
        } else {
            throw new Error('Not found')
        }
    } catch (e) {
        console.error(e)
        res.status(404).json({ error: 'Not found' })
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

module.exports = router
