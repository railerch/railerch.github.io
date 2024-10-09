export const testFn = () => console.log("Main FN script OK!")

export function proyectos(config, nodoContenedor, index = false) {
    nodoContenedor.innerHTML = "";

    // Filtrar solo proyectos activos para mostrar
    const proyectos = config.proyectos.filter(p => {
        if (p.estatus == "online") return p;
    });

    // Limitar los proyectos a 4 para la pagina de inicio
    const L = index ? 4 : proyectos.length;
    console.log("Online: " + L)
    for (let i = 0; i < L; i++) {
        // =====> Contenedor
        let div = document.createElement("div");
        div.classList.add("col-5");
        div.classList.add("col-md-2");
        div.classList.add("portafolio-card");

        // =====> Imagen
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        img.setAttribute("src", proyectos[i].img);
        img.setAttribute("alt", "Imagen del proyecto");
        img.classList.add("img-fluid");
        figure.appendChild(img);

        // =====> Descripcion
        let descripcion = document.createElement("p");
        descripcion.classList.add("mb-0");
        descripcion.innerText = proyectos[i].nombre;

        // =====> Boton
        let btn;
        if (proyectos[i].tipo == "demo") {
            btn = document.createElement("button");
            btn.setAttribute("data-bs-toggle", "modal");
            btn.setAttribute("data-bs-target", "#modal-descripcion-proyecto");

            // Detalles en modal
            btn.addEventListener("click", evt => {
                // Retornar al modal de portafolio en caso de haber accedido al detalle desde alli
                const cerrar = document.querySelector("#modal-descripcion-proyecto #cerrar");

                if (sessionStorage.getItem("proyectos")) {
                    cerrar.removeAttribute("data-bs-dismiss");
                    cerrar.setAttribute("data-bs-toggle", "modal");
                    cerrar.setAttribute("data-bs-target", "#modal-portafolio");
                } else {
                    cerrar.setAttribute("data-bs-dismiss", "modal");
                    cerrar.removeAttribute("data-bs-toggle");
                    cerrar.removeAttribute("data-bs-target");
                }

                document.querySelector("#modal-descripcion-proyecto #thumbnail")
                    .src = proyectos[i].img;

                document.querySelector("#modal-descripcion-proyecto #thumbnail")
                    .alt = proyectos[i].nombre;

                document.querySelector("#modal-descripcion-proyecto #nombre")
                    .textContent = proyectos[i].nombre != "" ? proyectos[i].nombre : "Sin definir...";

                document.querySelector("#modal-descripcion-proyecto #descripcion")
                    .textContent = proyectos[i].descripcion != "" ? proyectos[i].descripcion : "Sin definir...";

                document.querySelector("#modal-descripcion-proyecto #tecnologias")
                    .textContent = proyectos[i].tecnologias != "" ? proyectos[i].tecnologias : "Sin definir...";

                document.querySelector("#modal-descripcion-proyecto #continuar")
                    .href = proyectos[i].url_demo;
            })
        } else {
            btn = document.createElement("a");
            btn.setAttribute("href", proyectos[i].url_tmp);
            btn.setAttribute("target", "_blank");
        }

        btn.classList.add("botones-app");
        btn.innerHTML = "Abrir <i class='bi bi-box-arrow-up-right'></i>";

        div.appendChild(figure);
        div.appendChild(descripcion);
        div.appendChild(btn);
        nodoContenedor.appendChild(div)
    }
}