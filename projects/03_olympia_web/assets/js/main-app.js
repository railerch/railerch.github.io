// IMPORTAR FUNCIONES
import * as fn from "./main-fn.js";

// ======================================= PAGINA DE INICIO

// DOBLE CLIC AL FOOTER PARA IR AL CMS DESDE LA PAGINA DE INICIO
if (window.location.pathname.includes("inicio.php")) {
    document.querySelector("#footer").addEventListener("dblclick", function () {
        window.location.replace("cms-login.php");
    })
}

// REDES SOCIALES
document.querySelectorAll(".bx").forEach(btn => {
    // Agregar textos descriptivos a los botones de redes sociales
    btn.addEventListener("mouseover", function () {
        let divTxt = this.getAttribute("data-btn");
        this.querySelector("span").innerText = divTxt;
    })

    btn.addEventListener("mouseout", function () {
        this.querySelector("span").innerText = "";
    })
})

// ======================================= GESTOR DE CONTENIDO

// CARGAR CONTENIDO DE LA SECCION SELECCIONADA PARA EDITARLO
document.querySelectorAll(".accordion-button").forEach(btn => {
    btn.addEventListener("click", function () {
        // Cambiar imagen de referencia visual
        document.getElementById("screeshot-img").setAttribute("src", `assets/img/cmsScreenshots/${this.getAttribute("data-img")}.jpg`);

        // Registros a consultar
        let reng = this.getAttribute("data-reng").split("-");
        console.log("Registro: " + reng);

        // ID de seccion
        let secId = this.getAttribute("data-sec");

        // Consultar datos del renglon en base de datos
        reng.forEach(reng => {
            fetch(`cms-ctrl.php?consultarRegistro=true&id=${reng}`)
                .then(res => res.json())
                .then(res => {
                    // ======= Seleccionar formulario
                    let frm = document.getElementById(`frm-${reng}-${secId}`);


                    // ======= Cargar datos en elementos de formulario
                    // Obtener las claves del renglon 
                    let claves = Object.keys(res);

                    // Buscar los elementos del formulario que coincidan con los campos que contengan 
                    // datos y llenarlos con los mismos
                    claves.forEach(k => {
                        let frmEl = frm.querySelector(`#frm-${reng}-${secId}-${k}`)
                        if (frmEl && frmEl.getAttribute("type") != "file") {
                            frmEl.value = res[k];
                        }
                    })
                })

        })
    })
})

// ACTUALIZAR REGISTRO
document.querySelectorAll(".frm-btn").forEach(el => {
    el.addEventListener("click", function (evt) {
        evt.preventDefault();
        let secId = this.getAttribute("data-sec-id");
        let rengId = this.getAttribute("data-reng");
        let frmId = this.getAttribute("data-frm-id");
        let frmData = new FormData(document.getElementById(frmId));

        // Enviar nombre de archivo en caso de existir
        if (document.querySelector(`#${frmId} input[type=file]`)) {
            let nombreArch = document.querySelector(`#${frmId} input[type=file]`).getAttribute("data-nombre-archivo");
            frmData.append("nombreArchivo", nombreArch);
        }

        fetch(`cms-ctrl.php?actualizarRegistro=true&id=${rengId}`, { method: "post", body: frmData })
            .then(res => res.json())
            .then(res => {
                if (res.stmt) {
                    fn.aviso_usuario(`aviso-usuario-${secId}`, "success", "Elemento actualizado correctamente.", 3000)
                    // Si el formulario contiene un input file lo reinicia
                    if (document.querySelector(`#${frmId} input[type=file]`)) {
                        document.querySelector(`#${frmId} input[type=file]`).value = "";
                    }
                }
            }).catch(err => {
                fn.aviso_usuario(`aviso-usuario-${secId}`, "danger", "Error al actualizar elemento, intente nuevamente.", 3000)
                console.log("DETALLES DEL ERROR: " + err);
            })
    })
});

// CAMBIAR ESTATUS DEL SITIO WEB (offLine/onLine)
document.getElementById("estatus-web-btn").addEventListener("click", function () {

    let estatusAct = this.getAttribute("data-estatus");
    let estatusSig = estatusAct == "online" ? "offline" : "online";
    let clsAct = estatusAct == "online" ? "alert-success" : "alert-danger";
    let clsSig = clsAct == "alert-success" ? "alert-danger" : "alert-success";

    fetch(`cms-ctrl.php?cambiarEstatusWeb=true&st=${estatusSig}`)
        .then(res => res.json())
        .then(res => {
            let estatus = document.getElementById("estatus-web");
            estatus.classList.remove(clsAct);
            estatus.classList.add(clsSig);

            document.getElementById("estatus-web-txt").innerText = estatusSig;
            document.getElementById("estatus-web-btn").setAttribute("data-estatus", estatusSig)
        }).catch(err => {
            console.log("HA OCURRIDO UN ERROR: " + err);
        })
})