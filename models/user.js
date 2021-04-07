'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // this.gameId = this.belongsTo(models.Game)
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            gameId: DataTypes.INTEGER,
            color: DataTypes.ENUM(['red', 'blue', 'mod']),
        },
        {
            sequelize,
            modelName: 'User',
        }
    )
    return User
}
