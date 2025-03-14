import config from "../../config.json" with {type: "json"}

// DATOS DEL PROYECTO
const params = new URLSearchParams(window.location.search);
const pid = params.get("id");
const project = config.proyectos.find(p => p.id == pid);

// NOMBRE DEL PROYECTO
document.getElementById("nombre").textContent = project.nombre

// CAROUSEL DE IMAGENES
const L = project.capturas;
let i = 1;

const img = document.querySelector("main img");
img.setAttribute("src", `captures/img (${i}).jpg`);

// SIGUIENTE IMAGEN
document.getElementById("adelante").addEventListener("click", evt => {
    if (i < L) {
        i++;
        img.setAttribute("src", `captures/img (${i}).jpg`);
        animacion(img);
    }
})

// IMAGEN PREVIA
document.getElementById("atras").addEventListener("click", evt => {
    if (i > 1) {
        i--;
        img.setAttribute("src", `captures/img (${i}).jpg`);
        animacion(img);
    }
})

// CERRAR VENTANA
const atrasBtn = document.getElementById("atras");
const div = document.createElement("div")
div.classList = "btn btn-outline-light";
div.textContent = "Cerrar ventana";
atrasBtn.after(div);

div.addEventListener("click", evt => {
    window.close();
})

// ANIMACION FADE-IN PARA IMAGENES
function animacion(img) {
    let opa = 0;
    document.querySelector("main").scrollTop = 0;
    setInterval(function () {
        if (opa < 1) {
            img.style.opacity = opa
            opa += 0.1;
        }
    }, 30)
}

