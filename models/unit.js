const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Unit = sequelize.define("Unit", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
});

module.exports = Unit;
