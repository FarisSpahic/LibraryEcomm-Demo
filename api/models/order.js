const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Book = require('./book'); // Adjust path as needed
const Address = require('./address');

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Books", // Name of your Book model
      key: "id",
    },
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Addresses", // Name of your Address model
      key: "id",
    },
  },
  userId: {
    type: DataTypes.STRING, // Keycloak ID assumed to be a string
    allowNull: false,
  },
});

// Associations
Order.associate = () => {
  Order.belongsTo(Book, { foreignKey: "bookId" });
  Order.belongsTo(Address, { foreignKey: "addressId" });
};

module.exports = Order;
