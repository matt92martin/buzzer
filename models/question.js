'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Question.init(
        {
            gameId: DataTypes.INTEGER,
            question: DataTypes.TEXT,
            category: DataTypes.TEXT,
            difficulty: DataTypes.TEXT,
            correct_answer: DataTypes.TEXT,
            bad_answers: DataTypes.TEXT,
            answered: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Question',
        }
    )
    return Question
}
