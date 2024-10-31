
export default class Table {
    constructor(columnas) {
        this.columnas = columnas;
        this.tableId = null;
    }

    /**
     * Metodo para renderizar la tabla de datos registrados en la BD
     * 
     * @param {string} containerId - ID del contenedor donde se renderizara la tabla de datos
     */
    crear_tabla(containerId) {
        // Div contenedro de la tabla
        let container = document.getElementById(containerId);
        container.innerHTML = "";

        // Crear tabla
        let table = document.createElement("table");
        this.tableId = table.id = "registros-tbl";
        table.style.width = "100%";
        table.style.fontSize = "0.5em";
        table.style.border = "1px solid gray";
        table.style.marginTop = "2em";
        table.style.color = "#fff";

        // Encabezado de la tabla
        let thead = document.createElement("thead");
        thead.style.backgroundColor = "#000";

        // Columnas de la tabla
        let tr = document.createElement("tr");
        this.columnas.forEach(col => {
            let cell = document.createElement("th");
            cell.innerText = col;
            tr.appendChild(cell);
        })

        // Columna de acciones
        let actTh = document.createElement("th");
        actTh.innerText = "Act";
        tr.appendChild(actTh);

        // Cuerpo de la tabla
        let tbody = document.createElement("tbody");

        // Ensamblar tabla
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
    }

    /**
     * Metodo que trabaja en conjunto con 'crear_tabla()', fue necesario separar el renderizado
     * de la tabla del renderizado de renglones motivado al funcionamiento repetitivo del cursor
     * con el que se cargan los datos para visualizacion.
     * 
     * @param {object} registro - Registro (renglon) con el cual se crea el renglon en la tabla
     */
    crear_filas(registro) {
        let tbody = document.querySelector(`#${this.tableId} tbody`);
        let tr = document.createElement("tr");
        let idNum;

        // Registros
        for (let col in registro) {
            if (col.toLowerCase().includes("id_")) idNum = col;
            let cell = document.createElement("td");
            cell.style.padding = "3px"
            cell.innerText = registro[col];
            tr.appendChild(cell);
        }

        // Botones
        const btnCell = document.createElement("td");
        btnCell.style.padding = "3px";
        btnCell.innerHTML = `
                <i class='bi bi-pencil btn editar edit-rec-btn' data-id='${registro[idNum]}'></i>
                <i class='bi bi-trash btn eliminar delete-rec-btn' data-id='${registro[idNum]}'></i>`;
        tr.appendChild(btnCell);

        // Agregar al tbody
        tbody.appendChild(tr);
    }
}