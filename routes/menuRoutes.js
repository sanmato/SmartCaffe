//const menuController = require("../controllers/menuController");

//router.get('/', menuController.getAllMenu);

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
} = require("../controllers/menuController");

router.get("/menu", getAllProducts);

router.post("/products", createProduct);

module.exports = router;
