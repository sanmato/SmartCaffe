let menuItems = [];

const getMenuItems = () => {
  return fetch("https://sanmato.alwaysdata.net/api/menu")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la respuesta correcta de la API");
      }
      return response.json();
    })
    .then((json) => {
      menuItems = json;
      createMenuContainers(); // Crea los contenedores después de recibir los datos
    })
    .catch((error) => {
      console.error("Error al cargar los datos desde la API:", error);
    });
};

// Función para crear los contenedores y elementos del menú
const createMenuContainers = () => {
  const menuByCategory = {};

  menuItems.forEach((menuItem) => {
    const categoryName = menuItem.category.name.toLowerCase();
    if (!menuByCategory[categoryName]) {
      menuByCategory[categoryName] = [];
    }

    menuByCategory[categoryName].push(menuItem);
  });

  const createMenuItems = (containerId, items) => {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Container ${containerId} no encontrado`);
      return;
    }

    items.forEach((item) => {
      const img = new Image();
      img.src = item.image_url;
      img.onload = () => {
        const menuItemDiv = document.createElement("div");
        menuItemDiv.classList.add("col", "menu-item");

        menuItemDiv.innerHTML = `
          <img src="${item.image_url}" alt="${item.title}"/>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p style="text-align: center;"><b>$ ${item.price}</b></p>
        `;

        // Verificar si el usuario está autenticado
        const token = localStorage.getItem("token");
        if (token) {
          // Agregar botones de modificar y eliminar
          const modifyButton = document.createElement("a");
          modifyButton.href = "#modificar";
          modifyButton.textContent = "Modificar";
          modifyButton.classList.add("boton-modificar");
          modifyButton.addEventListener("click", () => modifyItem(item.id));
          menuItemDiv.appendChild(modifyButton);

          const deleteButton = document.createElement("a");
          deleteButton.href = "#eliminar";
          deleteButton.textContent = "Eliminar";
          deleteButton.classList.add("boton-eliminar");
          deleteButton.addEventListener("click", () => deleteItem(item.id));
          menuItemDiv.appendChild(deleteButton);
        }

        container.appendChild(menuItemDiv);
      };

      img.onerror = () => {
        console.error(`Error al cargar la imagen: ${item.image_url}`);
      };
    });
  };

  for (const categoryName in menuByCategory) {
    const containerId = categoryName + "Items";
    if (document.getElementById(containerId)) {
      const items = menuByCategory[categoryName];
      createMenuItems(containerId, items);
    }
  }
};

const modifyItem = (id) => {
  // Implementar la lógica para modificar el producto
  alert(`Modificar producto con ID: ${id}`);
};

const deleteItem = (id) => {
  // Implementar la lógica para eliminar el producto
  alert(`Eliminar producto con ID: ${id}`);
};

getMenuItems();

window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
      initializeStickyNavbar();

      const token = localStorage.getItem("token");
      const loginButton = document.querySelector(".inicioSesion");

      if (token) {
        // Ocultar botón de login
        loginButton.style.display = "none";

        // Mostrar botón de logout
        const logoutButton = document.createElement("button");
        logoutButton.className = "btn inicioSesion";
        logoutButton.textContent = "Cerrar Sesión";
        logoutButton.addEventListener("click", () => {
          // Eliminar el token del localStorage
          localStorage.removeItem("token");

          // Redireccionar o actualizar la página según necesites
          window.location.reload(); // Ejemplo: recarga la página
        });

        // Insertar el botón de logout en lugar del botón de login
        loginButton.parentElement.appendChild(logoutButton);
      }
    })
    .catch((error) =>
      console.error("Error al cargar la barra de navegación:", error)
    );

  const footerContainer = document.getElementById("footer-container");

  fetch("footer.html")
    .then((response) => response.text())
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((error) =>
      console.error("Error al cargar el pie de página:", error)
    );

  const loginForm = document.querySelector("#form-login");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const response = await fetch(
          "https://sanmato.alwaysdata.net/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Login successful:", result);

        // Guardar el token en el almacenamiento local
        localStorage.setItem("token", result.token);

        // Muestra el mensaje de bienvenida si el login es exitoso
        alert(
          "Bienvenido admin! Ahora te encuentras habilitado para gestionar los productos"
        );

        window.location.href = "index.html";
      } catch (error) {
        console.error("Login failed:", error);
        document.getElementById("loginError").style.display = "block";
      }
    });
  }
});

const initializeStickyNavbar = () => {
  const navBar = document.getElementById("navbar-container");
  const sticky = navBar.offsetTop;

  const staticNav = () => {
    if (window.scrollY >= sticky) {
      navBar.classList.add("sticky");
    } else {
      navBar.classList.remove("sticky");
    }
  };

  window.onscroll = staticNav;
};

const form = document.getElementById("mail");

if (form) {
  emailjs.init("32G2HiEDAkpEVXid8");

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm("service_urq6rpc", "template_2x26gsz", event.target).then(
      () => {
        alert("Correo enviado correctamente!");
        form.reset();
      },
      (error) => {
        console.error("Error al enviar el correo:", error);
      }
    );
  };

  form.addEventListener("submit", sendEmail);
}
