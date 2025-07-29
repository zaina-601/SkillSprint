'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    static associate(models) {
      Goal.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Goal.hasMany(models.Task, { foreignKey: 'goalId', as: 'tasks' });
      Goal.hasMany(models.ProgressLog, { foreignKey: 'goalId', as: 'progressLogs' });
    }
  }
  Goal.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Not Started' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } }
  }, { sequelize, modelName: 'Goal' });
  return Goal;
};