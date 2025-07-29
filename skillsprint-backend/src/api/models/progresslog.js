'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgressLog extends Model {
    static associate(models) {
      ProgressLog.belongsTo(models.Goal, { foreignKey: 'goalId', onDelete: 'CASCADE' });
    }
  }
  ProgressLog.init({
    logDate: { type: DataTypes.DATE, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    hoursSpent: DataTypes.FLOAT,
    goalId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Goals', key: 'id' } }
  }, { sequelize, modelName: 'ProgressLog' });
  return ProgressLog;
};