'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attraction_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.reviews)
      this.belongsTo(models.attractions)

    }
  };
  attraction_review.init({
  }, {
    sequelize,
    modelName: 'attraction_review',
    freezeTableName: true,
    timestamps:false
  });
  return attraction_review;
};