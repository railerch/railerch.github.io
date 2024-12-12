// CAMBIAR ESTILOS DEL HEADER AL HACER SCROLL
const header = document.querySelector("header");
window.addEventListener("scroll", evt => {
    if (window.scrollY > 10) {
        header?.style.boxShadow = "0 0 10px #00000050";
        header?.style.backgroundColor = "#ffffff90";
        header?.style.backdropFilter = "blur(3px)";
    } else {
        header?.style.backgroundColor = "transparent";
        header?.style.boxShadow = "unset";
        header?.style.backdropFilter = "none";
    }
})