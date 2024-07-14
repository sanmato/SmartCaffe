let menuItems = [];
let isEditMode = false;

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
  window.location.href = `form-carga.html?id=${id}`;
};

getMenuItems();

const loadProductData = async (id) => {
  try {
    const response = await fetch(
      `https://sanmato.alwaysdata.net/api/products/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product = await response.json();

    document.getElementById("productName").value = product.title;
    document.getElementById("productType").value = product.category_id;
    document.getElementById("productImageUrl").value = product.image_url;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productUnit").value = product.unit_id || "4";
  } catch (error) {
    console.error("Error al cargar los datos del producto:", error);
  }
};

const handleProductForm = () => {
  const productForm = document.getElementById("productForm");
  if (productForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
      isEditMode = true;
      loadProductData(productId);
      document.querySelector('button[type="submit"]').textContent =
        "Actualizar";
    }

    productForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (isEditMode) {
        await updateProduct(event);
      } else {
        await createProduct(event);
      }
    });
  }
};

const createProduct = async (event) => {
  const formData = new FormData(event.target);
  const productData = {
    title: formData.get("productName"),
    category_id: parseInt(formData.get("productType")),
    image_url: formData.get("productImageUrl"),
    description: formData.get("productDescription"),
    price: parseFloat(formData.get("productPrice")),
    unit_id:
      formData.get("productUnit") === "4"
        ? null
        : parseInt(formData.get("productUnit")),
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://sanmato.alwaysdata.net/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product upload successful:", result);
    alert("Producto cargado exitosamente");

    window.location.href = "index.html";
  } catch (error) {
    console.error("Product upload failed:", error);
    alert("Error al cargar el producto. Inténtelo nuevamente.");
  }
};

const updateProduct = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const productId = new URLSearchParams(window.location.search).get("id");

  const productData = {
    title: formData.get("productName"),
    category_id: parseInt(formData.get("productType")),
    image_url: formData.get("productImageUrl"),
    description: formData.get("productDescription"),
    price: parseFloat(formData.get("productPrice")),
    unit_id:
      formData.get("productUnit") === "4"
        ? null
        : parseInt(formData.get("productUnit")),
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://sanmato.alwaysdata.net/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product update successful:", result);
    alert("Producto actualizado exitosamente");

    window.location.href = "index.html";
  } catch (error) {
    console.error("Product update failed:", error);
    alert("Error al actualizar el producto. Inténtelo nuevamente.");
  }
};

const deleteItem = async (id) => {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://sanmato.alwaysdata.net/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Producto eliminado exitosamente");
      // Recargar la página o actualizar la lista de productos
      location.reload();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto. Inténtelo nuevamente.");
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
      initializeStickyNavbar();

      const token = localStorage.getItem("token");
      const loginButton = document.querySelector(".inicioSesion");
      const loadProductButton = document.querySelector(
        'a[href="form-carga.html#cargarProducto"]'
      );
      loadProductButton.style.display = "none";

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

        loadProductButton.style.display = "block";
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

        // Guardamos el token en el almacenamiento local
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

  //EDICIÓN DE PRODUCTO
  handleProductForm();
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
