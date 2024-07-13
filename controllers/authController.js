const bcrypt = require("bcrypt"); // Asegúrate de importar bcrypt
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Recibida solicitud de login:", req.body);

  try {
    const user = await User.findOne({ where: { email } });
    console.log("Usuario encontrado:", user); // Agrega este console.log

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Contraseña válida:", isPasswordValid); // Agrega este console.log

    if (!isPasswordValid) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const logout = (req, res) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No hay token proporcionado" });
  }

  try {
    // Aquí podrías agregar la lógica para invalidar el token, por ejemplo,
    // agregándolo a una lista negra o revocando su validez.

    // Eliminar el token del almacenamiento del cliente
    localStorage.removeItem("token"); // Asegúrate de ajustar esto según cómo guardas el token en el cliente

    // Redireccionar a la página inicial u otra página relevante
    res.redirect("/");
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { login, logout };
