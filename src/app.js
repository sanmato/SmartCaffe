const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("../util/database");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const menuRouter = require("../routes/menuRoutes");
const authRouter = require("../routes/auth");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Usar el router de menu
app.use("/api", menuRouter);

// Ruta de login
app.use("/api", authRouter);

app.post("/api/test", (req, res) => {
  console.log("Test POST route hit");
  res.json({ message: "Test POST successful" });
});

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

console.log("JWT_SECRET:", process.env.JWT_SECRET);
