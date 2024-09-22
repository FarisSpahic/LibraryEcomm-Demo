const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path as needed

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imgData: {
    type: DataTypes.BLOB('long'), // Store image as bytes
    allowNull: false,
  },
});

module.exports = Image;