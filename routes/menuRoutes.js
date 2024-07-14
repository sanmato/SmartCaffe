//const menuController = require("../controllers/menuController");

//router.get('/', menuController.getAllMenu);

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
} = require("../controllers/menuController");

router.get("/menu", getAllProducts);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.get("/products/:id", getProductById);

module.exports = router;
