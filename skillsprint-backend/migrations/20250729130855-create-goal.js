'use strict';
module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.createTable('Goals', {
id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
title: { type: Sequelize.STRING, allowNull: false },
description: { type: Sequelize.TEXT },
startDate: { type: Sequelize.DATE, allowNull: false },
endDate: { type: Sequelize.DATE, allowNull: false },
status: { type: Sequelize.STRING },
userId: { type: Sequelize.INTEGER, allowNull: false, onDelete: 'CASCADE', references: { model: 'Users', key: 'id' } },
createdAt: { allowNull: false, type: Sequelize.DATE },
updatedAt: { allowNull: false, type: Sequelize.DATE }
});
},
async down(queryInterface, Sequelize) { await queryInterface.dropTable('Goals'); }
};