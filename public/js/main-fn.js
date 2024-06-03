export const testFn = () => console.log("Main FN script OK!")

export function proyectos(config, nodoContenedor) {
    nodoContenedor.innerHTML = "";
    config.proyectos.forEach(proyecto => {
        // =====> Contenedor
        let div = document.createElement("div");
        div.classList.add("col-5");
        div.classList.add("col-md-2");
        div.classList.add("portafolio-card");

        // =====> Imagen
        let img = document.createElement("img");
        img.setAttribute("src", proyecto.img);
        img.setAttribute("alt", "Imagen del proyecto");
        img.classList.add("img-fluid");

        // =====> Descripcion
        let descripcion = document.createElement("p");
        descripcion.classList.add("mb-0");
        descripcion.innerText = proyecto.nombre;

        // =====> Boton
        let link = document.createElement("a");
        link.classList.add("botones-app");
        link.setAttribute("href", proyecto.url);
        link.setAttribute("target", "_blank");
        link.innerText = "Ver demo";

        div.appendChild(img);
        div.appendChild(descripcion);
        div.appendChild(link);
        nodoContenedor.appendChild(div)
    })
}