/*const db = require('../db/db')

exports.getAllMenu = (req, res) => {
    const sql = 'SELECT * FROM menu';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};*/

// const path = require("path");
// const fs = require("fs");
// const rootDir = require("../util/path");

// const getMenu = (req, res) => {
//   const filePath = path.join(rootDir, "items.json");
//   fs.readFile(filePath, "utf-8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Error leyendo el archivo JSON" });
//     }
//     const menuItems = JSON.parse(data);
//     res.json(menuItems);
//   });
// };

// module.exports = { getMenu };

const Product = require("../models/product");
const Category = require("../models/Category");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category", attributes: ["name"] }],
      order: [["id", "ASC"]],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = { getAllProducts };
