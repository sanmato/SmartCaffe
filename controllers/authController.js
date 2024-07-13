const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Recibida solicitud de login:", req.body);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
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
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aquí podrías realizar cualquier acción de limpieza necesaria, por ejemplo:
    // - Invalidar el token
    // - Eliminar el token del almacenamiento del cliente (si es necesario)

    // Redireccionar a la página inicial
    res.redirect("/");
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { login, logout };
