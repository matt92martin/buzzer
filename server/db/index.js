const path = require('path')
const { Sequelize } = require('sequelize')
const { Database } = require('sqlite3').verbose()
const { open } = require('sqlite')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'db.sqlite'),
})

const makeDB = async () => {
    return open({
        filename: path.resolve(__dirname, 'db.sqlite'),
        driver: Database,
    })
}

module.exports = { db, makeDB }
