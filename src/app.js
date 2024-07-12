const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("../util/database");
require("dotenv").config();

const app = express();

// Importar el router de menu
const menuRouter = require("../routes/menuRoutes");
const { login } = require("../controllers/userController"); // Importa el controlador de login

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Asegura que puedes manejar JSON en el cuerpo de las solicitudes
app.use(express.static(path.join(__dirname, "..", "public")));

// Usar el router de menu
app.use("/api/menu", menuRouter);

// Ruta de login
app.post("/api/login", login);

sequelize
  .sync()
  .then((result) => {
    console.log("Base de datos sincronizada");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
  });
