const axios = require('axios')
const sqlite = require('sqlite3')
const path = require('path')
const fs = require('fs')
const GameSettings = require('./gameSettings')

const db = sqlite.Database(path.join('..', 'db.sqlite'))

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

const Game = {}
const setupGame = async () => {
    const categories = GameSettings.categories

    for (let category in categories) {
        console.log(`${category}: ${categories[category]}`)

        const params = {
            amount: GameSettings.number,
            category: category,
            difficulty: GameSettings.difficulty,
            type: GameSettings.type,
        }
        const res = await axios.get('https://opentdb.com/api.php', { params }).then((res) => res.data)

        Game[category] = {
            name: categories[category],
            questions: res.results,
        }

        await wait(2000)
    }

    db.close()
}

setupGame()
