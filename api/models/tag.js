const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path as needed

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the Tag model
module.exports = Tag;