'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Questions', 'answered', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            }),
        ])
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn('Question', 'answered')])
    },
}
