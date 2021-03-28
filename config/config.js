const path = require('path')

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: path.resolve('server', 'db', 'db.sqlite'),
    },
    production: {
        dialect: 'sqlite',
        storage: path.resolve('server', 'db', 'db.sqlite'),
    },
}
