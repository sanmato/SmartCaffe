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
          <p style="text-align: center;"> <b> $ ${item.precio} </b> </p>
          <a href="#comprar" class="boton-comprar">Comprar ahora</a>
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
  // Cargamos la navbar
  const navbarContainer = document.getElementById("navbar-container");
  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
      initializeStickyNavbar();
    })
    .catch((error) => console.error("Error al cargar la navbar:", error));

  // Cargamos el footer
  const footerContainer = document.getElementById("footer-container");
  fetch("footer.html")
    .then((response) => response.text())
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((error) => console.error("Error al cargar el footer:", error));
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

//MANEJO DE MAIL

const form = document.getElementById("mail");

if (form) {
  emailjs.init("32G2HiEDAkpEVXid8"); //ID DE USUARIO DE LA API EMAILJS
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm("service_urq6rpc", "template_2x26gsz", event.target).then(
      //Aca seteamos los id de template y servicio
      () => {
        alert("Correo enviado correctamente!");
        form.reset();
      },
      (error) => {
        console.log("Error al enviar el correo", error);
      }
    );
  };

  form.addEventListener("submit", sendEmail);
}

window.onload = () => {
  createMenuContainers();
};
