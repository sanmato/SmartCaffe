const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("../util/database");
require("dotenv").config();

const app = express();

// Importar el router de menu
const menuRouter = require("../routes/menuRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Usar el router de menu
app.use("/api/menu", menuRouter);

sequelize
  .sync()
  .then((result) => {
    console.log("Base de datos sincronizada");
    const PORT = process.env.DB_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
  });
