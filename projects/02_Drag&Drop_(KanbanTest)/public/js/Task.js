import Debug from "./Debug.js";
export default class Task {

    constructor() {
        this.task = null;
        this.taskParent = null;
        this.taskTarget = null;
        this.debug_msg = new Debug("msg-div");
    }

    setTaskTarget(targetId) {
        this.taskTarget = targetId;
    }

    createTask() {
        let div = document.createElement("div");
        let num = parseInt(Math.random() * 1000)
        const color = `#${num < 100 ? num + 100 : num}`;
        div.id = `task${color}`;
        div.classList.add("task");
        div.setAttribute("draggable", true);
        div.style.backgroundColor = color;
        div.style.zIndex = "99";

        // Eliminar tarea
        let del = document.createElement("b");
        del.innerHTML = "<i class='bi bi-x-octagon'></i>"
        del.classList.add("del-task");
        del.style.position = "relative";
        del.style.left = "90%";
        del.style.backgroundColor = "transparent";
        del.style.margin = 0;
        del.style.padding = 0;
        div.prepend(del);

        // ID de tarea
        const id = Math.floor(Math.random() * 10000);
        let idTarea = document.createElement("h4")
        idTarea.innerHTML = `<i class="bi bi-key" title="ID de tarea"></i> ID: T-${id}`;
        div.appendChild(idTarea);

        // Descripcion de la tarea
        let label = document.createElement("p")
        label.innerHTML = `<i class="bi bi-list-check" title="Descripcion de la tarea"></i> Tarea: ${document.getElementById("title").value}`;
        div.appendChild(label);

        // Fecha de creacion
        let createDate = document.createElement("p");
        let date = new Date();
        createDate.style.marginTop = "0.3em";
        createDate.innerHTML = `<small><i class="bi bi-calendar3"></i> Creada: ${date.toLocaleDateString()}</small>`;
        div.appendChild(createDate);

        // Fecha de finalizacion
        let endDate = document.createElement("p");
        endDate.style.marginTop = "0.3em";
        endDate.innerHTML = `<small><i class="bi bi-calendar3"></i> Finaliza: ${document.getElementById("end-date").value}</small>`;
        div.appendChild(endDate);

        // Eventos
        del.addEventListener("click", (evt) => {
            evt.target.parentElement.parentElement.remove();
        })

        // Capturar el elemento dragable
        // Capturar el elemento padre del elemento dragable
        div.addEventListener("mousedown", (evt) => {
            this.task = evt.target;
            this.taskParent = evt.target.parentElement.id
        })

        // Ocultar el elemento dragable en el contenedor de origen para dar la 
        // sensacion de que este se esta sacando del contenedor
        div.addEventListener("drag", (evt) => {
            evt.target.style.display = "none";
        })

        // Mensaje de estado en la parte superior de la vista
        div.addEventListener("dragstart", (evt) => {
            console.log(`Drag Obj: ${evt.target.id} | Active task: ${this.task.id} | Origin ID: ${this.taskParent} `);
        })

        // Mostrar el elemento dragable en su lugar de destino
        // Mostrar mensaje de estado en la parte superior de la vista
        div.addEventListener("dragend", (evt) => {
            evt.target.style.display = "block";
            console.log(`Drop Obj: ${evt.target.id} | Active task: ${this.task.id} | Target ID: ${this.taskTarget} `)
        })

        return div;
    }
}


