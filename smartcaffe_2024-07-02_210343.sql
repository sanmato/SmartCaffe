-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smartcaffe
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `categories` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `categories`
--

/*!40000 ALTER TABLE `categories` DISABLE KEYS */
;

INSERT INTO
    `categories`
VALUES (5, 'accesorios'),
    (2, 'bakery'),
    (1, 'bebidas'),
    (4, 'cafe'),
    (3, 'salados');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */
;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `images` (
    `id` int NOT NULL AUTO_INCREMENT,
    `product_id` int NOT NULL,
    `img_src` varchar(255) NOT NULL,
    `alt_text` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `images`
--

/*!40000 ALTER TABLE `images` DISABLE KEYS */
;
/*!40000 ALTER TABLE `images` ENABLE KEYS */
;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `category_id` int NOT NULL,
    `title` varchar(255) NOT NULL,
    `description` text,
    `price` decimal(10, 2) NOT NULL,
    `unit_id` int DEFAULT NULL,
    `image_url` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `category_id` (`category_id`),
    KEY `unit_id` (`unit_id`),
    CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
    CONSTRAINT `products_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `products`
--

/*!40000 ALTER TABLE `products` DISABLE KEYS */
;

INSERT INTO
    `products`
VALUES (
        1,
        1,
        'Café Espresso',
        'Un café fuerte y aromático servido en una taza pequeña.',
        1800.00,
        NULL,
        './assets/img/espresso.jpg'
    ),
    (
        2,
        1,
        'Café Latte',
        'Una combinación suave de café espresso y leche caliente.',
        3600.00,
        NULL,
        './assets/img/latte.jpg'
    ),
    (
        3,
        2,
        'Cheesecake',
        'Un clásico irresistible que acompaña perfectamente tu café favorito!',
        4500.00,
        1,
        './assets/img/cheesecake.jpg'
    ),
    (
        4,
        2,
        'Pastel de Chocolate como Matilda!',
        'Una porción del icónico pastel de la icónica película para que también alientes a Bruce.',
        5200.00,
        1,
        './assets/img/pastelchocolate.jpg'
    ),
    (
        5,
        3,
        'Croissant Simple',
        'El más perfectamente horneado Croissant, para acompañar cualquier infusión!',
        1650.00,
        NULL,
        './assets/img/ruta_de_croissant.jpg'
    ),
    (
        6,
        4,
        'Colombia de Especialidad',
        'Un café de intensidad moderada de especialidad, ideal para cafeteras Espresso o Prensa Francesa.',
        73530.00,
        2,
        './assets/img/ruta_de_cafe_colombia.jpg'
    ),
    (
        7,
        4,
        'Santos Bourbon',
        'De origen brasilero, de intensidad moderada pero un poco mas intensa que el Colombia, con un leve sabor a caramelo, ideal para cualquier cafetera.',
        63940.00,
        2,
        './assets/img/santos_bourbon.jpg'
    ),
    (
        8,
        4,
        'Familiar',
        'Café familiar en grano.',
        61940.00,
        2,
        './assets/img/familiar.jpg'
    ),
    (
        9,
        5,
        'Cafetera Moka',
        'Cafetera Moka de estilo italiano, capacidad de 6 pocillos.',
        130581.00,
        NULL,
        './assets/img/cafetera_moka.jpg'
    ),
    (
        10,
        5,
        'Molinillo Eléctrico',
        'Molinillo eléctrico, con estilo de molienda a selección.',
        53700.00,
        NULL,
        './assets/img/molinillo.jpg'
    ),
    (
        11,
        2,
        'Si la vida te da limones...',
        'Qué mejor que hacer un delicioso Lemon Pie?',
        4200.00,
        1,
        './assets/img/lemonpie.jpg'
    ),
    (
        12,
        1,
        'Mocca',
        'Una deliciosa combinación de espresso, leche vaporizada, crema batida y un toque de chocolate, para deleitar tus sentidos.',
        5200.00,
        NULL,
        './assets/img/mocca.jpg'
    ),
    (
        13,
        1,
        'Capuccino',
        'Una fusión perfecta de espresso y espuma de leche, coronado con un toque de polvo de cacao.',
        3850.00,
        NULL,
        './assets/img/capuccino.jpg'
    ),
    (
        14,
        1,
        'Flat White',
        'El más delicioso café con una fina capa de leche caliente espumada.',
        3200.00,
        NULL,
        './assets/img/flat_white.jpg'
    ),
    (
        15,
        1,
        'Macchiato',
        'Café espresso con una muy pequeña porción de leche caliente espumada.',
        4200.00,
        NULL,
        './assets/img/macchiato.jpg'
    ),
    (
        16,
        2,
        'El pastel favorito de Amelie...',
        'Para llenarse los dedos de frutillas.',
        5100.00,
        1,
        './assets/img/pastelfrutilla.jpg'
    ),
    (
        17,
        2,
        'Budín de Zanahorias',
        'Delicioso budín de Zanahoria.',
        3500.00,
        1,
        './assets/img/budin_zanahorias.jpg'
    ),
    (
        18,
        2,
        'Sfogliatella',
        'La más crocante con la más rica crema pastelera!',
        3720.00,
        NULL,
        './assets/img/sfogliatella.jpg'
    ),
    (
        19,
        3,
        'Tostado Jamón y Queso',
        'Jamón al natural con mozzarella, viene con pan de masa madre.',
        3900.00,
        NULL,
        './assets/img/tostado.jpg'
    ),
    (
        20,
        3,
        'Bagel con Jamón y Queso',
        'Bagel con semillas de sésamo, relleno con Jamón al natural y mozzarella.',
        3500.00,
        NULL,
        './assets/img/bagel_jyq.jpg'
    ),
    (
        21,
        3,
        'Scon de Queso',
        'Clásico y sabroso Scon de Queso, una de las especialidades saladas.',
        3800.00,
        NULL,
        './assets/img/scon_queso.jpg'
    ),
    (
        22,
        3,
        'Bagel con Guacamole',
        'Bagel Integral con semillas de sésamo, con guacamole para untar.',
        4100.00,
        NULL,
        './assets/img/bagel_guacamole.jpg'
    ),
    (
        23,
        3,
        'Avocado Toast',
        'Tostada de campo integral con guacamole, huevo pochado y tomate cherry.',
        4200.00,
        NULL,
        './assets/img/avocado_toast.jpg'
    ),
    (
        24,
        4,
        'Fincas Espíritu Santo',
        'De origen Brasil, intensidad media, sabor y aroma a caramelo.',
        58140.00,
        2,
        './assets/img/ruta_fincas.jpg'
    ),
    (
        25,
        4,
        'Amore Rosso',
        'Sutiles notas dulces y amaderadas, de carácter profundo.',
        59650.00,
        2,
        './assets/img/ruta_amore.jpg'
    ),
    (
        26,
        4,
        'Perú de especialidad',
        'El más delicado grano de café de origen peruano, intensidad media y muy fuerte de aroma.',
        72350.00,
        2,
        './assets/img/ruta_peru.jpg'
    ),
    (
        27,
        5,
        'Cafetera émbolo',
        'Cafetera émbolo, conocida también como Prensa Francesa.',
        79020.00,
        NULL,
        './assets/img/prensa.jpg'
    ),
    (
        28,
        5,
        'Espumador de leche',
        'Espumador de leche eléctrico, puede espumar, calentar, o calentar y espumar.',
        38920.00,
        NULL,
        './assets/img/espumador.jpg'
    ),
    (
        29,
        5,
        'Taza para café',
        'La mejor taza para acompañar tu café, consultar para personalizar.',
        18340.00,
        NULL,
        './assets/img/taza.jpg'
    ),
    (
        30,
        5,
        'Cafetera Filtro',
        'Cafetera de Filtro, capacidad de 6 pocillos.',
        128460.00,
        NULL,
        './assets/img/filtro.jpg'
    );
/*!40000 ALTER TABLE `products` ENABLE KEYS */
;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `units` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `units`
--

/*!40000 ALTER TABLE `units` DISABLE KEYS */
;

INSERT INTO `units` VALUES (2, 'kg'), (1, 'porción'), (3, 'unidad');
/*!40000 ALTER TABLE `units` ENABLE KEYS */
;

--
-- Dumping routines for database 'smartcaffe'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-07-02 21:03:49