'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  group.init({
    name: DataTypes.STRING, //딴애는다 name인데 얘만 groupName -> name으로바꿈
    leader: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'group',
    freezeTableName: true,
    timestamps:false
  });
  return group;
};