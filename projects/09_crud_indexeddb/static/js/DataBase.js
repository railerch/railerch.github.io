
import Form from "./Form.js";

export default class MyDataBase {
    constructor() {
        this.db = null;
        this.dbName = null;
        this.storage = [];
        this.campos = [];
        this.form = new Form("", "", "");
    }

    /**********************************************************************************************************
     * Se activa cuando hay errores en el codigo o la ejecución
     * 
    * @param {any} evt - El evento propio de IDBOpenDBRequest
     */
    error = (evt) => {
        const err = evt.target.error;
        alert(`ERROR!\nCodigo: ${err.code}\nMensaje: ${err.message}`);
    }

    /**********************************************************************************************************
     * Se activa cuando se intenta abrir una BD inexistente, en este caso se crea una nueva BD
     * A su vez en este evento procedemos a crear los almacenes de datos
     * 
    * @param {any} evt - El evento propio de IDBOpenDBRequest
     */
    upgradeneeded = (evt) => {
        alert("EXITO!\nSe ha creado una nueva BD.");

        // Definir el nombre del almacen o tabla de datos inicial
        this.storage = prompt("Nombre del almacen (tabla) de datos: ");

        // Definir campos de la tabla
        alert("IMPORTANTE!\nA continuacion defina los campos de la tabla o almacen\nen el siguiente formato: nombreCampo;tipo(int | str | email)");
        [this.campos] = [prompt("IMPORTANTE!\nDefina los campos separados por coma.\nTenga en cuenta que el primer campo es\n de clave primaria y debe empezar con 'id_': ").split(",")];

        // Guardar datos de campos en el storage del navegador para restaurar el
        // formulario desde el evento 'success' cuando se 
        // realice una conexion a la base de datos indicada
        localStorage.setItem(`${this.dbName};${this.storage}`, JSON.stringify(this.campos));

        // Procedemos a crear el almacen inicial de objetos (Tabla) para la base de datos con 'createObjectStore()'
        // Este recibe dos parametros: el storage y el campo clave primaria

        let primKey = this.campos[0].split(";")[0];
        let db = evt.target.result;
        let objStore = db.createObjectStore(this.storage, { keyPath: primKey });

        // FORMULARIOS
        // Indicar nombre de la base de datos
        this.form.dbName = this.dbName;

        // Indicar nombre del almacen de la base de datos
        this.form.storage = this.storage;

        // Cargar campos para formularios
        this.form.campos = this.campos;

        // Se procede a crear los items de datos que contendra el almacen con 'createIndex()'
        this.form.crear_campos_frm(false, objStore);
    }

    /**********************************************************************************************************
     * Evento que se activa cuando tenemos exito con la creación, conexión 
     * o apertura de una db existente
     * 
     * @param {any} evt - El evento propio de IDBOpenDBRequest
     */
    success = (evt) => {
        alert("EXITO!\nSe ha conectado a la BD.");

        // Guardamos la instancia de la conexion
        // Independientemente de si se crea o se reconecta a la bd el evento 'success' siempre se activara
        // por lo que el resultado de la conexion es recomendable guardarlo aqui y no en 'upgradeneeded'
        this.db = evt.target.result;

        // ===============================================> RECONEXION A UNA BD EXISTENTE

        // Luego de haber indicado el nombre de la BD al reconectar, se debe indicar el 
        // almacen (tabla) de datos dentro de la misma
        if (this.db.objectStoreNames.length > 1) {
            let storageName = prompt("Indique el nombre del almacen (tabla) a utilizar: ");
            let i = this.db.objectStoreNames.indexOf(storageName);
            this.storage = this.db.objectStoreNames[i];
        } else {
            this.storage = this.db.objectStoreNames[0];
        }

        // FORMULARIOS
        // Indicar nombre de la base de datos
        this.form.dbName = this.dbName;

        // Indicar nombre del almacen de la base de datos
        this.form.storage = this.storage;

        // Cargar campos para formularios
        this.form.campos = this.campos;

        // Restaurar campos del formulario, en caso de reconexion con la bd
        this.form.crear_campos_frm(true);

        // Mostrar el boton para guardar los datos
        document.getElementById("save-data").style.display = "inline"
    }
} 