"use strict";
// CAMBIAR ESTILOS DEL HEADER AL HACER SCROLL
const header = document.querySelector("header");
window.addEventListener("scroll", evt => {
    if (window.scrollY > 10) {
        header === null || header === void 0 ? void 0 : header.style.boxShadow = "0 0 10px #00000050";
        header === null || header === void 0 ? void 0 : header.style.backgroundColor = "#ffffff90";
        header === null || header === void 0 ? void 0 : header.style.backdropFilter = "blur(3px)";
    }
    else {
        header === null || header === void 0 ? void 0 : header.style.backgroundColor = "transparent";
        header === null || header === void 0 ? void 0 : header.style.boxShadow = "unset";
        header === null || header === void 0 ? void 0 : header.style.backdropFilter = "none";
    }
});
