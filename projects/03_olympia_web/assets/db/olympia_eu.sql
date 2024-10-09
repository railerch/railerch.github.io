-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2023 a las 02:39:36
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `olympia_eu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pag_inicio`
--

CREATE TABLE `pag_inicio` (
  `id` int(11) NOT NULL,
  `seccion` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `elemento` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `titulo` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(1000) COLLATE utf8_spanish_ci NOT NULL,
  `icon` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `btn01` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `btn02` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `img_doc_url` varchar(1000) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pag_inicio`
--

INSERT INTO `pag_inicio` (`id`, `seccion`, `elemento`, `titulo`, `descripcion`, `icon`, `btn01`, `btn02`, `img_doc_url`) VALUES
(1, 'head-carousel', '01', 'Ferreteria', 'Productos y equipos de alta calidad.', '', '', '', 'assets/uploads/slider-principal-img-0.jpg'),
(2, 'head-carousel', '02', 'Artes Gráficas', 'Todo en insumos graficos para tu negocio.', '', '', '', 'assets/uploads/slider-principal-img-1.jpg'),
(3, 'nosotros', '', 'Experiencia y calidad', 'Somos una empresa con más de 60 años en Venezuela especializada en la importación, distribución y venta a nivel nacional de productos y equipos de alta calidad en dos importantes divisiones: Artes Gráficas y Herramientas.', '', '', '', 'assets/uploads/nosotros-img-0.jpg'),
(4, 'porque-nosotros', '01', 'Calidad', 'Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para destt', 'bx bx-heart', '', '', ''),
(5, 'porque-nosotros', '02', 'Experiencia', 'Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para dest', 'bx bx-medal', '', '', ''),
(6, 'porque-nosotros', '03', 'Garantia y servicio', 'Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt debitis quo vel nam quis.', 'bx bx-check-shield', '', '', ''),
(7, 'divisiones-encabezado', '', 'DIVISIONES', 'Actualmente contamos con las siguientes divisiones', '', '', '', ''),
(8, 'divisiones', '01', 'Herramientas Eléctricas', 'Ofrecemos equipos duraderos, de alto rendimiento y capacidad de trabajo: METABO, KARBOSAN, HELLER, OSBORN, RUKO y OLYMPIC siendo este ultimo nuestra marca propia registrada', 'bx bx-bolt-circle', '', '', ''),
(9, 'divisiones', '02', 'Artes Gráficas', 'Tenemos los insumos de Artes Gráficas de mejor calidad, contamos con las marcas: IBF, ARETS, HOSTMANN STEINBERG, PHOENIX, KSL, BBA Fiberweb, QUIFOPAN', 'bx bx-layer', '', '', ''),
(10, 'catalogos', '', 'Catalogo de productos', 'Descargue nuestros catalogos en formato PDF con las ultimas actualizaciones de nuestros productos.', '', 'assets/uploads/catalogo-ferreteria.pdf', 'assets/uploads/catalogo-artes-graficas.pdf', 'assets/img/catalogos-bg.jpg'),
(11, 'contacto', '', 'CONTACTO', 'Para mayor información, no dudes en contactarnos', '', '', '', ''),
(12, '', 'direccion', '', '3ra Transversal de Los Ruices, Edificio Principal II, Piso 4, Oficina 41-B y 42-B. caracas.', '', '', '', ''),
(13, '', 'telefonos', '', '(0212) 237.30.22 / 237.02.79', '', '', '', ''),
(14, '', 'instagram-ferreteria', '', '', '', '', '', 'https://www.instagram.com/olympiaeu.herramientas/'),
(15, '', 'instagram-artes-graficas', '', '', '', '', '', 'https://www.instagram.com/olympiaeu.artesgraficas/'),
(16, '', 'whatsapp', '', '04245555555', '', '', '', ''),
(17, '', 'email', '', 'info@olympiaeu.com', '', '', '', ''),
(18, '', 'googleMap', '', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.8000816354714!2d-66.83187247081757!3d10.484868499532494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a583618327cdf%3A0xc19278a7591121a6!2sEdificio%20Principal%20II%2C%20Caracas%201071%2C%20Distrito%20Capital!5e0!3m2!1ses-419!2sve!4v1668543813493!5m2!1ses-419!2sve\" width=\"100%\" height=\"350\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '', '', '', ''),
(19, '', 'logo', '', '', '', '', '', 'assets/img/logo.png'),
(20, '', 'sliderMarcas', '', '', '', '', '', 'assets/img/proveedores/metabo.png;assets/img/proveedores/huber.png;assets/img/proveedores/heller.png;assets/img/proveedores/arets.png;assets/img/proveedores/olympic.png;assets/img/proveedores/ibf.png;assets/img/proveedores/karbosan.png;assets/img/proveedores/fiberweb.png;assets/img/proveedores/ruko.png;assets/img/proveedores/osborn.png'),
(118, 'estatus', 'estatus', 'Estatus del sitio web:', 'online', '', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pag_inicio`
--
ALTER TABLE `pag_inicio`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pag_inicio`
--
ALTER TABLE `pag_inicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
