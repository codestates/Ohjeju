'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users)
      this.belongsTo(models.group)
    }
  };
  user_group.init({
  }, {
    sequelize,
    modelName: 'user_group',
    freezeTableName: true,
    timestamps:false
  });
  return user_group;
};