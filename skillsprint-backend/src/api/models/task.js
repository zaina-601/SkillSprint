'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Goal, { foreignKey: 'goalId', onDelete: 'CASCADE' });
    }
  }
  Task.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    deadline: DataTypes.DATE,
    status: { type: DataTypes.STRING, defaultValue: 'To Do' },
    goalId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Goals', key: 'id' } }
  }, { sequelize, modelName: 'Task' });
  return Task;
};