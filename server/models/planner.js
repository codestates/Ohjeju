'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.group)
    }
  };
  planner.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'planner',
    freezeTableName: true,
    timestamps:false
  });
  return planner;
};