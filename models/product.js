const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Category = require("./category");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "units",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

module.exports = Product;
