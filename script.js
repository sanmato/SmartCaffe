const menuItems = [];

const getMenuItems = () => {
  return fetch("./items.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      menuItems.push(...json);
    })
    .catch((error) => console.error("Error al cargar el archivo JSON", error));
};

//Para obtener esto dinamicamente, es necesario cargar una serie de funciones.

const createMenuContainers = () => {
  // Creamos un menu para cada categoria
  const menuByCategory = {};

  // Agrupamos los elementos del menu por categoria
  menuItems.forEach((menuItem) => {
    if (!menuByCategory[menuItem.category]) {
      menuByCategory[menuItem.category] = [];
    }
    menuByCategory[menuItem.category].push(menuItem);
  });

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
          `;
      container.appendChild(menuItemDiv);
    });
  };

  //Crear contenedores y elementos del menu por categoria
  for (const category in menuByCategory) {
    const containerId = category + "Items";
    const items = menuByCategory[category];
    createMenuItems(containerId, items);
  }
};

getMenuItems().then(createMenuContainers);

window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
    })
    .catch((error) => console.error("Error al cargar la navbar:", error));
});

let navBar = document.getElementById("navbar-container");
let sticky = navBar.offsetTop;

window.onscroll = () => {
  staticNav();
};

const staticNav = () => {
  if (window.scrollY >= sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
};

window.onload = () => {
  createMenuContainers();
};
