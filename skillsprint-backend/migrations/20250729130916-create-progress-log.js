'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProgressLogs', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      logDate: { type: Sequelize.DATE, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      hoursSpent: { type: Sequelize.FLOAT },
      goalId: { type: Sequelize.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'Goals', key: 'id' } },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('ProgressLogs'); }
};