'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.planner)
    }
  };
  plan.init({
    departureTime: DataTypes.STRING,
    destination: DataTypes.STRING,
    memo: DataTypes.STRING,
    day: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'plan',
    freezeTableName: true,
    timestamps:false
  });
  return plan;
};