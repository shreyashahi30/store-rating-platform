const { DataTypes } = require(
  'sequelize'
);

const sequelize = require(
  '../config/db'
);

const User = require('./User');
const Store = require('./Store');

const Rating = sequelize.define(
  'Rating',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['UserId', 'StoreId'],
      },
    ],
  }
);

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

module.exports = Rating;