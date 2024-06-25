/*const db = require('../db/db')

exports.getAllMenu = (req, res) => {
    const sql = 'SELECT * FROM menu';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};*/

const path = require("path");
const fs = require("fs");
const rootDir = require("../util/path");

const getMenu = (req, res) => {
  const filePath = path.join(rootDir, "items.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error leyendo el archivo JSON" });
    }
    const menuItems = JSON.parse(data);
    res.json(menuItems);
  });
};

module.exports = { getMenu };
