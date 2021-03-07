const path = require('path')
const { Database } = require('sqlite3').verbose()
const { open } = require('sqlite')

const makeDB = async () => {
    return open({
        filename: path.resolve(__dirname, 'db.sqlite'),
        driver: Database,
    })
}

module.exports = { makeDB }
