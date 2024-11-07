"use stric"
import * as fn from "./main-fn.js"
import config from "../../../config.json" with { type: "json"};

// ==========> TEST SCRIPTS
fn.testFn();
console.log("Main JS script OK!");
console.log(config.test);

// ==========> CONSTANTES PARA CALCULO DE PROPORCIONES ADAPTABLES
const alturaViewport = window.innerHeight;
const alturaHeader = document.querySelector("header").getBoundingClientRect().height;
const alturaSecciones = alturaViewport - alturaHeader;
const alturaImagenes = alturaSecciones * 0.75;

// ==========> CARGAR VENTANAS MODAL
fetch("modal.html")
    .then(res => res.text())
    .then(res => {
        const modalDiv = document.getElementById("ventanas-modal");
        modalDiv.innerHTML = res;

        // Remover indicador de apertura de modal de proyectos
        // El indicador se activa al hacer clic en el btn 'Mas Proyectos' - ID: btn-mas-proyectos
        sessionStorage.removeItem("proyectos")

        // Activar listener con el boton de cierre de la ventana de proyectos 
        // para eliminar el indicador ya mencionado
        document.querySelector("#modal-portafolio #cerrar")
            .addEventListener("click", evt => sessionStorage.removeItem("proyectos"));

        // Activar listener para el boton continuar en la ventana modal 'modal-descripcion-proyecto', esto para
        // mostrar o no el slider de capturas si no es un demo
    });

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
const pxHastaElTope = parseInt(document.querySelector("body").getBoundingClientRect().y);
window.scrollBy(0, pxHastaElTope);

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

// ==========> ENLACES Y MINIATURAS DE PROYECTOS EN PAGINA DE INICIO PORTAFOLIO
let seccionPortafolio = document.getElementById("portafolio-sec-img");
fn.proyectos(config, seccionPortafolio, true);

// ==========> ENLACES Y MINIATURAS DE PROYECTOS EN VENTANA MODAL PORTAFOLIO 
document.getElementById("btn-mas-proyectos").addEventListener("click", (evt) => {
    const modalBodyProyectos = document.querySelector(".modal-body #proyectos");
    fn.proyectos(config, modalBodyProyectos);

    // Indicar apertura del modal de proyectos para que al cerrar el modal de detalles
    // de proyectos retorne al modal anterior y no solo lo cierre
    sessionStorage.setItem("proyectos", true);
})

// ==========> ENLACES A REDES SOCIALES
const redesSocialesDiv = document.getElementById("redes-sociales-div")
config.redesSociales.forEach(red => {

    // Link
    let a = document.createElement("a");
    a.href = red.nombre == "Whatsapp" ? `${red.link}&text=${red.mensaje}` : red.link;
    a.target = "_blank";
    a.title = red.nombre

    // Icon
    let i = document.createElement("i");
    i.setAttribute("class", red.icono);

    a.append(i);
    redesSocialesDiv.append(a);
})

// ==========> SLIDER DE LOGOS
const sliderTrack = document.querySelector(".slide-track");
let x = 1;
for (let i = 0; i < 13; i++) {
    const slide = config.logoSlider;

    // Contenedor
    const div = document.createElement("div");
    div.classList.add("slide")

    // Imagen
    const img = document.createElement("img");
    img.src = slide[x].imagen;
    img.width = slide[x].ancho;
    img.height = slide[x].alto;
    img.alt = slide[x].nombre;

    div.appendChild(img);
    sliderTrack.appendChild(div);

    x++;
    if (x == 7) x = 0;
}

// ==========> SCROLL TOP
window.scrollTo();
let goTopBtn = document.getElementById("go-top");

// =====> Posicion por defecto
goTopBtn.style.top = window.scrollY + (window.innerHeight * 90 / 100);

// =====> Hacer scroll con el documento
window.addEventListener("scroll", function () {
    let btnPos = window.scrollY + (window.innerHeight * 90 / 100);
    goTopBtn.style.top = `${btnPos}px`
})

// =====> Hacer scroll hasta el inicio
goTopBtn.addEventListener("click", function () {
    // Posicion actual del tope de la ventana
    let top = window.scrollY;

    // Razon de aceleracion del scroll
    let R = 1;

    // Animacion del scroll
    let scrollTimer = setInterval(() => {
        top = top - (100 * R);
        window.scrollTo({
            top: top
        });

        // Si el tope de la ventana es menor a cero se cancela el timer
        if (top < 0) {
            clearInterval(scrollTimer);
        }

        // Aumentar la razon de aceleracion
        R++;

    }, 10)
})