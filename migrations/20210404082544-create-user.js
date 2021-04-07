'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gameId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
        await queryInterface.addColumn('Games', 'moderatorId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users')
    },
}
