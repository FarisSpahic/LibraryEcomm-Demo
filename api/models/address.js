const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING, // Assuming Keycloak ID is a string
    allowNull: false,
  },
});

// Association with User
Address.associate = (models) => {
  Address.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = Address;
