'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users)
    }
  };
  reviews.init({
    content: DataTypes.STRING,
    grade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reviews',
    freezeTableName: true,
    timestamps:false
  });
  return reviews;
};