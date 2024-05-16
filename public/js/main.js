"use stric"
import * as fn from "./main-fn.js"
import config from "./config.js"

// ==========> TEST SCRIPTS
fn.testFn();
console.log("Main JS script OK!");
console.log(config.test);

// ==========> VALORES DINAMICOS CONSTANTES
const alturaViewport = window.innerHeight;
const alturaHeader = document.querySelector("header").getBoundingClientRect().height;
const alturaSecciones = alturaViewport - alturaHeader;
const alturaImagenes = alturaSecciones * 0.75;

// ==========> FIJAR ALTO DE SECCIONES
/* Estas deben encajar de forma ajustada en el viewport */
Array.from(document.querySelectorAll("section")).forEach(sec => {
    if (window.innerWidth > 720) {
        sec.style.height = `${alturaSecciones}px`;
    }
})

// ==========> FIJAR TAMAÑO DE IMAGENES EN SECCIONES
document.querySelectorAll(".section-img img").forEach(img => {
    if (window.innerWidth > 720) {
        img.style.height = `${alturaImagenes}px`;
        img.style.width = "auto";
    }
})

// ==========> SCROLL TOP AL RECARGAR LA PAGINA
/* Calcular la altura del body para hacer scroll hasta la parte superior */
const pxHastElTope = parseInt(document.querySelector("body").getBoundingClientRect().y);
window.scrollBy(0, pxHastElTope);

// ==========> MARGEN SUPERIOR PARA SECCIONES AL HACER SCROLL
/* Se calcula el margen superior a cada seccion para que no se solape con el header
al hacer scroll mediante los links del navbar */
document.querySelectorAll("#navbarSupportedContent .nav-link").forEach(link => {
    /* Obtener la posicion del contenedor correspondiente a cada enlace para almacenarla en cada link */
    const idContenedor = link.getAttribute("data-section");
    const offset = document.getElementById(idContenedor).offsetTop;
    link.setAttribute("data-scroll-to", offset);

    /* Hacer scroll hasta la seccion seleccionada */
    link.addEventListener("click", (evt) => {
        const irHasta = parseInt(evt.target.getAttribute("data-scroll-to")) - alturaHeader;
        window.scrollTo(0, irHasta)
    })
})

// ==========> GENERAR ENTRADAS PARA EL PORTAFOLIO
document.getElementById("btn-portafolio").addEventListener("click", (evt) => {
    const modalBodyProyectos = document.querySelector(".modal-body #proyectos");
    modalBodyProyectos.innerHTML = "";
    for (let x = 0; x < 10; x++) {
        // =====> Contenedor
        let div = document.createElement("div");
        div.classList.add("portafolio-card")

        // =====> Imagen
        let img = document.createElement("img");
        img.setAttribute("src", "public/img/projects-img/demo-img.png");
        img.setAttribute("alt", "Imagen del proyecto")

        // =====> Descripcion
        let descripcion = document.createElement("p");
        descripcion.classList.add("mb-0")
        descripcion.innerText = "Lorem ipsum dolor sit amet";

        // =====> Boton
        let btn = document.createElement("button");
        btn.classList.add("botones-app")
        btn.innerText = "Ver demo";

        div.appendChild(img);
        div.appendChild(descripcion);
        div.appendChild(btn);
        modalBodyProyectos.appendChild(div)
    }


})


