export const testFn = () => console.log("Main FN script OK!")

export function proyectos(config, nodoContenedor, index = false) {
    nodoContenedor.innerHTML = "";

    // Filtrar solo proyectos activos para mostrar
    const proyectos = config.proyectos.filter(p => {
        if (p.mostrar) return p;
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
        img.setAttribute("src", proyectos[i].thumb);
        img.setAttribute("alt", "Imagen del proyecto");
        img.classList.add("img-fluid");
        figure.appendChild(img);

        // =====> Descripcion
        let descripcion = document.createElement("p");
        descripcion.classList.add("mb-0");
        descripcion.innerText = proyectos[i].nombre;

        // =====> Boton
        let btn;
        btn = document.createElement("button");
        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#modal-descripcion-proyecto");

        // Detalles en modal
        btn.addEventListener("click", evt => {
            // Retornar al modal de portafolio en caso de haber accedido al detalle desde alli
            const cerrar = document.querySelector("#modal-descripcion-proyecto #cerrar");
            const modal = document.getElementById("modal-descripcion-proyecto");

            if (sessionStorage.getItem("proyectos")) {
                cerrar.removeAttribute("data-bs-dismiss");
                cerrar.setAttribute("data-bs-toggle", "modal");
                cerrar.setAttribute("data-bs-target", "#modal-portafolio");
            } else {
                cerrar.setAttribute("data-bs-dismiss", "modal");
                cerrar.removeAttribute("data-bs-toggle");
                cerrar.removeAttribute("data-bs-target");
            }

            modal.querySelector("#thumbnail")
                .src = proyectos[i].thumb;

            modal.querySelector("#thumbnail")
                .alt = proyectos[i].nombre;

            modal.querySelector("#nombre")
                .textContent = proyectos[i].nombre != "" ? proyectos[i].nombre : "Sin definir...";

            modal.querySelector("#descripcion")
                .textContent = proyectos[i].descripcion != "" ? proyectos[i].descripcion : "Sin definir...";

            modal.querySelector("#tecnologias")
                .textContent = proyectos[i].tecnologias != "" ? proyectos[i].tecnologias : "Sin definir...";

            modal.querySelector("#tipo-proyecto")
                .textContent = proyectos[i].tipo_proyecto != "" ? proyectos[i].tipo_proyecto : "Sin definir...";

            modal.querySelector("#estatus")
                .textContent = proyectos[i].estatus != "" ? proyectos[i].estatus : "Sin definir...";

            modal.querySelector("#continuar")
                .href = proyectos[i].url + `?id=${proyectos[i].id}`;

            // Si el detalle se abrio desde el index el boton cerrar del modal esta por defecto
            // Si el detalle se abre desde la modal de mas proyectos, el boton cerrar de la modal
            // de detalles pasa a ser un boton para retroceder
            if (index) {
                document.querySelector("#modal-descripcion-proyecto #cerrar")
                    .innerHTML = "Cerrar <i class='bi bi-x-circle'></i>"
            } else {
                document.querySelector("#modal-descripcion-proyecto #cerrar")
                    .innerHTML = "<i class='bi bi-arrow-left-circle'></i> Atras"
            }

            // Cambiar el texto del boton en funcion a si son capturas o es un demo
            if (proyectos[i].demo) {
                document.querySelector("#modal-descripcion-proyecto #continuar")
                    .innerHTML = "Ver demo <i class='bi bi-search'></i>";
            } else {
                document.querySelector("#modal-descripcion-proyecto #continuar")
                    .innerHTML = "Ver capturas <i class='bi bi-search'></i>";
            }
        })

        btn.classList.add("botones-app");
        btn.innerHTML = "Abrir <i class='bi bi-box-arrow-up-right'></i>";

        div.appendChild(figure);
        div.appendChild(descripcion);
        div.appendChild(btn);
        nodoContenedor.appendChild(div)
    }
}