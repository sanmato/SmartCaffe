let menuItems = [];

const getMenuItems = () => {
  return fetch("http://localhost:3000/api/menu")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos del menú");
      }
      return response.json();
    })
    .then((json) => {
      menuItems = json;
    })
    .catch((error) => {
      console.error("Error al cargar los datos desde la API:", error);
    });
};

// Función para crear los contenedores y elementos del menú
const createMenuContainers = () => {
  // Creamos un objeto para agrupar los elementos del menú por categoría
  const menuByCategory = {};

  // Agrupamos los elementos del menú por categoría
  menuItems.forEach((menuItem) => {
    if (!menuByCategory[menuItem.category]) {
      menuByCategory[menuItem.category] = [];
    }

    menuByCategory[menuItem.category].push(menuItem);
  });

  // Función para crear los elementos del menú en un contenedor específico
  const createMenuItems = (containerId, items) => {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    items.forEach((item) => {
      const menuItemDiv = document.createElement("div");
      menuItemDiv.classList.add("col", "menu-item");

      menuItemDiv.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.alt}" />
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p style="text-align: center;"><b>$ ${item.precio}</b></p>
      `;

      // Agregar botón "Comprar ahora" solo para categorías "accesorios" y "cafe"
      if (item.category === "accesorios" || item.category === "cafe") {
        const comprarButton = document.createElement("a");
        comprarButton.href = "#comprar";
        comprarButton.classList.add("boton-comprar");
        comprarButton.textContent = "Comprar ahora";
        menuItemDiv.appendChild(comprarButton);
      }

      container.appendChild(menuItemDiv);
    });
  };

  // Crear contenedores y elementos del menú por categoría
  for (const category in menuByCategory) {
    const containerId = category + "Items";
    const items = menuByCategory[category];
    createMenuItems(containerId, items);
  }
};

// Manejo de eventos al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  // Cargar la barra de navegación (navbar)
  const navbarContainer = document.getElementById("navbar-container");

  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
      initializeStickyNavbar();
    })
    .catch((error) =>
      console.error("Error al cargar la barra de navegación:", error)
    );

  // Cargar el pie de página (footer)
  const footerContainer = document.getElementById("footer-container");

  fetch("footer.html")
    .then((response) => response.text())
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((error) =>
      console.error("Error al cargar el pie de página:", error)
    );

  // Verificar si los datos del menú están cargados antes de llamar a createMenuContainers
  if (menuItems.length === 0) {
    getMenuItems().then(createMenuContainers);
  } else {
    createMenuContainers();
  }
});

// Función para inicializar la barra de navegación pegajosa (sticky navbar)
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

// Manejo de formularios de email usando EmailJS
const form = document.getElementById("mail");

if (form) {
  emailjs.init("32G2HiEDAkpEVXid8"); // ID DE USUARIO DE EMAILJS

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
