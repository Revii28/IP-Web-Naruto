'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    static associate(models) {
      Village.hasMany(models.User, {
        foreignKey: 'villageId'
      });
    }
  }
  Village.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Name already exists'
      },
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    leader: DataTypes.STRING,
    history: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Village',
  });
  return Village;
};
