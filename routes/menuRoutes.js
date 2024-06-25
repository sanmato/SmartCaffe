//const menuController = require("../controllers/menuController");

//router.get('/', menuController.getAllMenu);

const express = require("express");
const router = express.Router();
const { getMenu } = require("../controllers/menuController");

router.get("/", getMenu);

module.exports = router;
