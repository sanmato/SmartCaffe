// Datos del menú. Pasados desde el HTML a un arreglo de objetos, con cada propiedad.
const menuItems = [
  {
    category: "bebidas",
    imgSrc: "ruta_de_la_imagen_espresso.jpg",
    alt: "Café Espresso",
    title: "Café Espresso",
    description: "Un café fuerte y aromático servido en una taza pequeña.",
  },
  {
    category: "bebidas",
    imgSrc: "ruta_de_la_imagen_latte.jpg",
    alt: "Café Latte",
    title: "Café Latte",
    description: "Una combinación suave de café espresso y leche caliente.",
  },
  {
    category: "bakery",
    imgSrc: "ruta_de_la_imagen_pastel.jpg",
    alt: "Pastel de Chocolate",
    title: "Pastel de Chocolate",
    description: "Un delicioso pastel de chocolate para acompañar tu café.",
  },
  {
    category: "bakery",
    imgSrc: "ruta_de_la_imagen_pastel_matilda.jpg",
    alt: "Bruce",
    title: "Pastel de chocolate como Matilda!",
    description:
      "Una porción del icónico pastel de la icónica película para que también alientes a Bruce.",
  },
  {
    category: "salados",
    imgSrc: "ruta_de_croissant.jpg",
    alt: "Croissant",
    title: "Croissant Simple",
    description:
      "El más perfectamente horneado Croissant, para acompañar cualquier infusión!",
  },
  {
    category: "cafe",
    imgSrc: "ruta_de_cafe_colombia.jpg",
    alt: "Colombia de Especialidad",
    title: "Colombia de Especialidad",
    description:
      "Un café de intensidad moderada de especialidad, ideal para cafeteras Espresso o Prensa Francesa.",
  },
  {
    category: "cafe",
    imgSrc: "santos_bourbon.jpg",
    alt: "SantosBourbon",
    title: "Santos Bourbon",
    description:
      "De origen brasilero, de intensidad moderada pero un poco mas intensa que el Colombia, con un leve sabor a caramelo, ideal para cualquier cafetera.",
  },
  {
    category: "cafe",
    imgSrc: "familiar.jpg",
    alt: "Familiar",
    title: "Familiar",
    description: "Café familiar en grano.",
  },
  {
    category: "accesorios",
    imgSrc: "cafetera_moka.jpg",
    alt: "Moka",
    title: "Cafetera Moka",
    description: "Cafetera Moka de estilo italiano, capacidad de 6 pocillos.",
  },
  {
    category: "accesorios",
    imgSrc: "molinillo.jpg",
    alt: "Molinillo",
    title: "Molinillo Eléctrico",
    description: "Molinillo eléctrico, con estilo de molienda a selección.",
  },
];

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

window.onload = () => {
  createMenuContainers();
};
