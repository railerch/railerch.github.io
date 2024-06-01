export default class Form {
    constructor(dbName, storage, campos) {
        this.dbName = dbName;
        this.storage = storage;
        this.campos = campos;
    }

    /**********************************************************************************************************
     * Generar campos para el formulario de registro de datos
     * 
     * @param {string} restoreFrm - Booleano que indica si se debe restaurar el formulario de registro, 
     * en caso tal se omite la creacion de campos en la bd
     * @param {any} objStore - Almacen de objetos, solo requerido para crear los campos de la bd, default = null
     */
    crear_campos_frm(restoreFrm, objStore = null) {

        // Mapear contenedor de campos en formulario
        let form = document.querySelector("#data-frm div:first-child");
        form.innerHTML = "";

        // Restaurar formulario de datos al reconectar con la bd, esto debido 
        // a reinicio en la pagina desde el navegador
        if (restoreFrm) {
            this.campos = JSON.parse(localStorage.getItem(`${this.dbName};${this.storage}`));
        }

        this.campos.forEach(camp => {
            // =====> FORMULARIO
            // Campos para el formulario de datos
            let dat = camp.split(";");
            let inp = document.createElement("input");

            // Atributos generales
            inp.setAttribute("name", dat[0]);
            inp.setAttribute("placeholder", dat[0]);

            // Atributos individuales
            switch (dat[1]) {
                case "int":
                    inp.setAttribute("type", "number");
                    inp.setAttribute("min", "0");
                    inp.setAttribute("max", "99");
                    break;
                case "str":
                    inp.setAttribute("type", "text");
                    break;
                case "email":
                    inp.setAttribute("type", "email");
                    break;
            }

            // Construir formulario
            form.appendChild(inp)

            // =====> BASE DE DATOS
            // Crear campos de base de datos en caso de no existir (Nueva BD)
            // Si no se esta restaurando el formulario de registro se crean los campos de la bd
            if (!restoreFrm) {
                this.crear_campos_bd(objStore, dat);
            }
        })
    }

    /**
     * Generador de campos bd
     * 
     * @param {Array} dat - Nombre del campo 
     */
    crear_campos_bd(objStore, dat) {
        // Campos de la base de datos, parametros:
        // 1. Nombre del indice
        // 2. Campo del indice
        // 3. Campo unico (true | false)

        if (dat[0].includes("id_")) {
            objStore.createIndex(dat[0].toUpperCase(), dat[0], { unique: true });
        } else {
            objStore.createIndex(dat[0].toUpperCase(), dat[0], { unique: false });
        }
    }
}