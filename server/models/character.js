'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsTo(models.User, { foreignKey: 'userId' });
      Character.belongsTo(models.Village, { foreignKey: 'villageId' });
    }
  }

  Character.init({
    imageUrl: DataTypes.TEXT,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    abilities: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Alive'
    },
    background: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'User ID is required'
        }
      }
    },
    villageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Village ID is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Character',
  });

  return Character;
};
