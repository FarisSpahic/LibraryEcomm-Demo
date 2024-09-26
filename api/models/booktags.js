const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Adjust path as needed
const Book = require("./book");
const Tag = require("./tag");

const BookTags = sequelize.define("BookTags", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book, // Adjust this based on your Book model name
      key: "id",
    },
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tag, // Adjust this based on your Tag model name
      key: "id",
    },
  },
});

BookTags.belongsTo(Book, { foreignKey: "bookId" });
BookTags.belongsTo(Tag, { foreignKey: "tagId" });

module.exports = BookTags;
