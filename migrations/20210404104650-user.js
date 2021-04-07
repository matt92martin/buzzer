'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('players', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('Users', 'color', { type: Sequelize.ENUM(['red', 'blue', 'mod']) })
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('players');
         */
        await queryInterface.removeColumn('Users', 'color')
    },
}
