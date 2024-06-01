import Task from "./Task.js";

// INICIO
let task = new Task();
const taskContainer = document.getElementById("backlog");
const dropContainers = Array.from(document.querySelectorAll(".stage")).concat(taskContainer);

// Reiniciar vista
document.querySelector(".clear").addEventListener("click", () => {
    // Limpiar stages
    document.querySelectorAll(".container div").forEach(div => div.innerHTML = "");

    // Elliminar tareas del backlog sin eliminar la palabra "Backlog"
    document.querySelectorAll("#backlog .task").forEach(task => task.remove());

    // Limpiar el formulario de creacion de tareas
    document.querySelectorAll("#form input").forEach(inp => inp.value = "");
})

// Crear tarea
document.querySelector(".create").addEventListener("click", () => {
    let title = document.getElementById("title").value;
    let endDate = document.getElementById("end-date").value;

    // Validar que los campos no esten vacios para crear una tarea
    if (title != "" && endDate != "") {
        taskContainer.appendChild(task.createTask());

        // Limpiar el formulario de creacion de tareas
        document.querySelectorAll("#form input").forEach(inp => inp.value = "");
    } else {
        // Mostrar aviso si hay algun campo vacio
        let aviso = document.createElement("span");
        aviso.style.color = "red";
        aviso.innerText = "Rellene todos los campos.";
        document.querySelector(".create").parentElement.appendChild(aviso);

        setTimeout(function () {
            aviso.style.display = "none";
        }, 2000)
    }
})

// CONTAINERS
dropContainers.forEach(div => {
    div.style.backgroundColor = div.id;

    // Resaltar contenedor de destino
    div.addEventListener("dragover", (evt) => {
        evt.preventDefault();
        if (evt.target.getAttribute("class") != "task")
            evt.target.style.backgroundColor = "red";
    })

    // Retornar color inicial al contenedor
    div.addEventListener("dragleave", (evt) => {
        evt.preventDefault();
        let color = evt.target.id == "backlog" ? "darkslategrey" : evt.target.id;
        evt.target.style.backgroundColor = color;
    })

    // Soltar task en contenedor de destino
    div.addEventListener("drop", (evt) => {
        evt.preventDefault()

        // Evitar duplicar una tarea en el contenedor de destino si es el mismo es el de origen
        // Evitar que los contenedores de tareas actuen como dropzones
        if (evt.target.id != task.taskParent && !evt.target.id.includes("task")) {
            task.setTaskTarget(evt.target.id);
            evt.target.appendChild(task.task);
        }

        // Evitar que una tarea pueda cambiar de stage una vez se marque como finalizada
        let stage = evt.target.getAttribute("data-stage");
        if (stage == "finalizada") {
            task.task.removeAttribute("draggable");
        }

        let color = evt.target.id == "backlog" ? "darkslategrey" : evt.target.id;
        evt.target.style.backgroundColor = color;
    })
})