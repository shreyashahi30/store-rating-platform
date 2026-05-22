const { DataTypes } = require(
  'sequelize'
);

const sequelize = require(
  '../config/db'
);

const User = require('./User');

const Store = sequelize.define(
  'Store',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,

      validate: {
        isEmail: true,
      },
    },

    address: {
      type: DataTypes.STRING(400),
    },
  }
);

Store.belongsTo(User, {
  foreignKey: 'ownerId',
});

module.exports = Store;