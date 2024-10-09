import MyDataBase from "./DataBase.js";
import Table from "./Table.js";

window.addEventListener("load", function (evt) {
    const createDbBtn = this.document.getElementById("create-db");
    const deleteDbBtn = this.document.getElementById("delete-db");
    const showDbBtn = this.document.getElementById("show-dbs");
    const saveDataBtn = this.document.getElementById("save-data");
    const form = this.document.getElementById("data-frm");
    const table = this.document.getElementById("table-div");
    const showTable = this.document.getElementById("show-table");
    const showForm = this.document.getElementById("show-form");
    const registrosTblDiv = this.document.getElementById("records-tbl-div");
    const editRecordDiv = this.document.getElementById("edit-record-div");

    // =================================> INICIALIZACION DE LA BASE DE DATOS
    const myDb = new MyDataBase();
    createDbBtn.addEventListener("click", (evt) => {
        // Definir el nombre de la BD
        let dbName = this.prompt("Nombre de la BD: ");

        if (dbName) {
            // Definir el nombre de la bd en la instacia de 'MyDataBase()'
            myDb.dbName = dbName;

            // ==========================>
            // EVENTOS DE indexedDB
            // ==========================> 

            // Al crear la base de datos se activan 3 eventos en el request
            const request = indexedDB.open(myDb.dbName);

            // Evt #1 Error => Se activa cuando hay errores en el codigo o la ejecución
            request.addEventListener("error", myDb.error);

            // Evt #2 UpgradeNeeded => Se activa cuando se intenta abrir una BD inexistente, en este caso se crea una nueva BD
            // A su vez en este evento procedemos a crear los almacenes de datos
            request.addEventListener("upgradeneeded", myDb.upgradeneeded);

            // Evt #3 Success => Se activa cuando tenemos exito con la creación, conexión o apertura de una db existente
            request.addEventListener("success", myDb.success);
        } else {
            this.alert("Debe especificar un nombre para la BD");
        }

    })

    // =================================> OPERACIONES CRUD

    // 1. Guardar datos en la BD
    saveDataBtn.addEventListener("click", (evt) => {
        evt.preventDefault();

        // Capturar campos y sus valores
        let datos = {};
        let campos = Array.from(this.document.getElementById("data-frm").elements);
        let save = true;
        campos.forEach(el => {
            // Filtrar solo los input
            if (el.tagName == "INPUT") {
                // Validar que el formulario no contenga campos vacios
                if (el.value == "") save = false;

                // Extraer el nombre del campo
                let campo = el.getAttribute("name");
                let valor = el.value;
                datos[`${campo}`] = valor;
            }
        })

        if (save) {
            // Se denomina transaccion a cualquier operacion CRUD que se pueda realizar con los datos dentro de una BD
            // Para realizar transacciones dentro de la API es necesario declararlas con el metodo 'transaction'
            // transaction recibe dos parametros:
            // 1. el nombre del almacen donde se hara la transaccion
            // 2. El modo de la transaccion = 'readonly | readwrite'
            const transaccion = myDb.db.transaction([myDb.storage], 'readwrite');

            // Para poder guardar datos es necesario abrir el almacen de destino
            const almacen = transaccion.objectStore(myDb.storage);

            // Guardar los datos del formulario
            almacen.add(datos);

            // Reiniciar formulario
            this.document.getElementById("data-frm").reset();

            // Hacer uso del evento 'complete' de la transaccion para alertar al usuario de que los datos se han guardado correctamente
            transaccion.addEventListener("complete", () => this.alert("Datos guardados correctamente!"));
        } else {
            this.alert("Debe completar el formulario de datos.")
        }

    })

    // 2. Seleccionar | actualizar | Eliminar registros de la BD (Mostrar tabla de datos)
    showTable.addEventListener("click", (evt) => {
        form.style.display = "none";
        table.style.display = "block";
        editRecordDiv.innerHTML = "";

        // Validar que exista una conexion activa a una BD
        if (myDb.dbName) {
            // Limpiar el contenedor
            registrosTblDiv.innerHTML = "";

            // Crear la transaccion (se hace con el almacen o tabla)
            // Si omitimos el modo de apertura, el valor por defecto es 'readonly'
            let transaccion = myDb.db.transaction([myDb.storage], "readonly");

            // Abrir el almacen
            let almacen = transaccion.objectStore(myDb.storage);

            // Instanciar la tabla de registros
            const cols = JSON.parse(this.localStorage.getItem(`${myDb.dbName};${myDb.storage}`)).map(col => col.split(";")[0].toUpperCase());
            const tabla = new Table(cols);
            tabla.crear_tabla("records-tbl-div");

            // Crear el puntero que recorrer los registros
            let puntero = almacen.openCursor();

            // Cargar los registros en la tabla una vez el cursor este listo
            puntero.addEventListener("success", (evt) => {
                let puntero = evt.target.result;

                // Validar que el puntero contenga datos, este al llegar al ultimo 
                // ciclo ya no contiene datos que mostrar y su valor es 'false'
                if (puntero) {
                    tabla.crear_filas(puntero.value);
                    puntero.continue();
                }
            })
        }

        // Seleccionar | actualizar | Eliminar un registros de la BD
        setTimeout(() => {
            const editRecord = this.document.querySelectorAll(".edit-rec-btn");
            const delRecord = this.document.querySelectorAll(".delete-rec-btn");

            editRecord.forEach(btn => {
                btn.addEventListener("click", (evt) => {
                    const registroId = evt.target.getAttribute("data-id");

                    // Abrir transaccion con el almacen
                    const transaccion = myDb.db.transaction([myDb.storage], "readwrite");

                    // Abrir almacen
                    const almacen = transaccion.objectStore(myDb.storage);

                    // Obtener el registro indicado
                    const request = almacen.get(registroId);

                    // Mostrar registro en formulario de edicion
                    request.addEventListener("success", (evt) => {
                        const data = evt.target.result;
                        const cols = Object.keys(data);

                        // Encabezado
                        const titulo = this.document.createElement("h3");
                        titulo.innerText = "Editar registro";

                        // Formulario de edicion
                        const myForm = document.createElement("form");
                        myForm.id = "edit-frm";
                        myForm.style.marginBottom = "1em";

                        // Campos formulario
                        cols.forEach(col => {
                            let input = this.document.createElement("input");

                            if (col.includes("id_")) {
                                input.setAttribute("type", "number");
                            } else if (col.includes("email")) {
                                input.setAttribute("type", "email");
                            } else {
                                input.setAttribute("type", "text");
                            }

                            input.setAttribute("placeholder", col);
                            input.setAttribute("name", col);
                            input.value = data[col];

                            myForm.appendChild(input);
                        })

                        // Submit Btn
                        const submitBtn = this.document.createElement("button");
                        submitBtn.setAttribute("type", "submit");
                        submitBtn.id = "actualizar-registro-btn";
                        submitBtn.innerText = "Actualizar";
                        myForm.appendChild(submitBtn);

                        // Mostrar formulario con los datos
                        editRecordDiv.innerHTML = "";
                        editRecordDiv.append(titulo);
                        editRecordDiv.append(myForm);

                        // Actualizar registro
                        this.document.getElementById("actualizar-registro-btn").addEventListener("click", (evt) => {
                            evt.preventDefault();
                            /*
                            IMPORTANTE:
                            Cada vez que se obtiene el succes de un request este ya yo es valido para mas transacciones 
                            se debe generar una nueva transaccion, o algo asi XD
                            */

                            // Abrir transaccion con el almacen
                            const transaccion = myDb.db.transaction([myDb.storage], "readwrite");

                            // Abrir almacen
                            const almacen = transaccion.objectStore(myDb.storage);

                            // Capturar campos y sus valores
                            let datos = {};
                            let campos = Array.from(this.document.getElementById("edit-frm").elements);
                            campos.forEach(el => {
                                // Filtrar solo los input
                                if (el.tagName == "INPUT") {
                                    // Extraer el nombre del campo
                                    let campo = el.getAttribute("name");
                                    let valor = el.value;
                                    datos[`${campo}`] = valor;
                                }
                            })

                            // Actualizar registro en BD
                            almacen.put(datos);

                            // Eliminar el formulario de edicion
                            editRecordDiv.innerHTML = "";

                            // Hacer uso del evento 'complete' de la transaccion para alertar al usuario de que los datos se han actualizado correctamente
                            transaccion.addEventListener("complete", () => this.alert("Datos actualizados correctamente!"));
                        })

                    })
                })
            })

            // Eliminar registros de la BD
            delRecord.forEach(btn => {
                btn.addEventListener("click", (evt) => {
                    const registroId = evt.target.getAttribute("data-id");

                    // Abrir transaccion con el almacen
                    const transaccion = myDb.db.transaction([myDb.storage], "readwrite");

                    // Abrir almacen
                    const almacen = transaccion.objectStore(myDb.storage);

                    // Eliminar el registro indicado
                    const request = almacen.delete(registroId);

                    // Eliminar la fila en la tabla
                    evt.target.parentElement.parentElement.remove();

                    // Aviso 
                    // transaccion.addEventListener("complete", () => this.alert("Datos eliminados correctamente!"));
                })
            })

        }, 300);

    })

    // =================================> OTROS EVENTOS

    // Ver bases de datos disponibles
    showDbBtn.addEventListener("click", (evt) => {
        this.indexedDB.databases().then(res => {
            let dataBases = "";
            res.forEach(db => {
                dataBases += `${db.name}\n`;
            })
            this.alert(`BASES DE DATOS DISPONIBLES\n${dataBases.concat()}`)
        });
    })

    // Eliminar base de datos
    deleteDbBtn.addEventListener("click", (evt) => {
        const dbName = this.prompt("Nombre de la BD que desea eliminar: ");
        if (dbName) {
            this.indexedDB.deleteDatabase(dbName);
            this.localStorage.removeItem(dbName);
            this.alert(`EXITO!\nBase de datos ${dbName} eliminada.`);
        } else {
            this.alert("Debe especificar un nombre valido.");
        }
    })

    // Mostrar formulario
    showForm.addEventListener("click", (evt) => {
        form.style.display = "block";
        table.style.display = "none";
        editRecordDiv.innerHTML = "";
    })

})