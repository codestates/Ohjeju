'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attractions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attractions.init({
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attractions',
    freezeTableName: true,
    timestamps:false
  });
  return attractions;
};