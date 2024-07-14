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
const Category = require("../models/category");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
          table: "categories",
        },
      ],
      order: [["id", "ASC"]],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const createProduct = async (req, res) => {
  const { title, description, price, category_id, unit_id, image_url } =
    req.body;

  if (!title || !price || !category_id || !image_url) {
    return res.status(400).json({
      error: "Los campos título, precio, categoría e imagen son obligatorios",
    });
  }

  try {
    const newProduct = await Product.create({
      title,
      description,
      price,
      category_id,
      unit_id,
      image_url,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

module.exports = { getAllProducts, createProduct };
