//const menuController = require("../controllers/menuController");

//router.get('/', menuController.getAllMenu);

const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/menuController");

router.get("/", getAllProducts);

module.exports = router;
