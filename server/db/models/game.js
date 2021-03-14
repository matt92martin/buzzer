const { DataTypes } = require('sequelize')
const { db } = require('..')

const Game = db.define('Game', {
    moderator: {
        type: DataTypes.TEXT,
    },
    moderator_password: {
        type: DataTypes.TEXT,
    },
    game_password: {
        type: DataTypes.TEXT,
    },
})

module.exports = { Game }
