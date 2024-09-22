// models/Book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path as needed
const Image = require('./image'); // Adjust path as needed

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ISBN: {
    type: DataTypes.STRING, // Consider using STRING for ISBN as it can include characters
    allowNull: true, // Optional
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: true, // Optional
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  totalPages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Image,
      key: 'id',
    },
  },
});

// Define associations
Book.belongsTo(Image, { foreignKey: 'imageId' });

module.exports = Book;
