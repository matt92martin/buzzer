'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Game.init(
        {
            moderator: DataTypes.TEXT,
            moderator_password: DataTypes.TEXT,
            game_password: DataTypes.TEXT,
            moderatorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Game',
        }
    )
    return Game
}
