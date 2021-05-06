const { Router } = require('express')
const { makeid } = require('../../util/random')
const db = require('../../models')
const { gameCookieName, cookieName } = require('../../config')
const axios = require('axios')
const { wait } = require('../../util/general')

const router = Router()

const { Game, Question, User } = db

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
        const user = await User.create({ username: gameOpts.moderator, gameId: game.id, color: 'mod' })
        await Game.update({ moderatorId: user.id }, { where: { id: game.id } })

        res.cookie(cookieName, user.id, { signed: true, sameSite: 'strict' })
        res.cookie(gameCookieName, game.id, { signed: true, sameSite: 'strict' })

        res.json({
            moderator: user.username,
            gameId: game.id,
            userId: user.id,
            color: user.color,
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
        const user = await User.findOne({ where: { id: game.moderatorId } })

        res.cookie(cookieName, game.moderatorId, { signed: true, sameSite: 'strict' })
        res.cookie(gameCookieName, game.id, { signed: true, sameSite: 'strict' })

        res.json({
            moderator: user.username,
            gameId: game.id,
            userId: user.id,
            color: user.color,
            gamePassword: game.game_password,
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
    const userId = req.signedCookies[cookieName]
    const gameId = req.signedCookies[gameCookieName]

    const categories = req.body.categories

    if (categories.length > 20) {
        return res.status(500).json({ error: 'Too many categories!' })
    }

    const maxQuestions = Math.add(...categories.map((c) => c.amount))

    if (maxQuestions > 10) {
        return res.status(500).json({ error: 'You have too many questions per category!' })
    }

    const total = categories.reduce((a, b) => a + b.amount, 0)

    if (total > 100) {
        return res.status(500).json({ error: 'You have too many questions!' })
    }

    const user = await User.findOne({ where: { id: userId } })

    if (user.gameId !== gameId || user.color !== 'mod') {
        return res.status(500).json({ error: 'You have too many questions per category!' })
    }

    let questions = []

    try {
        for (let category of categories) {
            const params = {
                category: category[0],
                difficulty: category[1],
                amount: category[2],
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
            await wait(100)
        }

        const savedQuestions = await Question.bulkCreate(questions)
        res.json(savedQuestions)
    } catch (e) {
        console.error(e)
    }
})

router.get('/questions', async (req, res) => {
    const gameId = req.signedCookies[gameCookieName]
    const userId = req.signedCookies[cookieName]

    const user = await User.findOne({ where: { id: userId } })

    if (user.gameId !== gameId) {
        return res.status(401).json({ error: 'Access denied' })
    }

    const questions = await Question.findAll({ where: { gameId } })

    res.json(questions)
})

router.put('/question/:id', async (req, res) => {
    const id = +req.params.id
    const gameId = req.locals.game
    const userId = req.signedCookies[cookieName]

    const game = await Game.findOne({ where: { id: gameId } })

    if (game.moderatorId === userId) {
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

module.exports = router
