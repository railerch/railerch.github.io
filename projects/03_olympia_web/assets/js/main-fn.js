// AVISO AL USUARIO
/**
 * Funcion global dedicada a la generacion de avisos al usuario y redireccion en caso de ser necesario.
 * @param {string} avisoDiv - El contenedor que mostrara el aviso
 * @param {string} tipo - El tipo de aviso: 'info', 'warning', 'success' o 'error' .
 * @param {string} texto - El mensaje que se mostrara en el aviso.
 * @param {number} duracion - El tiempo durante el cual se muestra el mensaje.
 * @param {boolean} preloader - Valor bool (true, false) que indica si se muestra la imagen gif animada que indica que la accion esta en proceso.
 * @param {boolean} redireccion - Valor bool (true, false) que indica si hay redireccion o no.
 * @param {string} redireccionUrl - La pagina o url de destino en caso de activar la redireccion.
 */

export function aviso_usuario(avisoDiv, tipo, mensaje, duracion, preloader = false, redireccion = false, redireccionUrl = null) {
    let contenedor = document.getElementById(avisoDiv);
    let clase = null;
    let titulo = '';
    let preloaderImg = '';
    let display = "none";

    switch (tipo) {
        case 'info':
            clase = "alert-info"
            titulo = "INFO:";
            break;
        case 'warning':
            clase = "alert-warning"
            titulo = "AVISO:";
            break;
        case 'success':
            clase = "alert-success"
            titulo = "EXITO:";
            break;
        case 'danger':
            clase = "alert-danger"
            titulo = "ERROR:";
            preloaderImg = "<i class='icon-attention'></i>";
            break;
    }

    // Activar preloader
    if (preloader) {
        preloaderImg = "<img src='img/preloader.gif' alt='Preloader.gif' style='width:30px;margin-right:10px'></img>";
    }

    // Comportamiento de cierre del aviso
    if (duracion == 0 && !redireccion) {
        // Cerrar el aviso mediante un boton sin redireccion a otra vista de la app
        display = "inline";
    } else if (duracion > 0 && !redireccion) {
        // El aviso se cierra automaticamente luego de un tiempo indicado
        setTimeout(function () {
            contenedor.innerHTML = "";
        }, duracion);
    }

    // Mostrar aviso
    contenedor.innerHTML = `
    <div id="aviso" class="alert ${clase} mt-2" role="alert">   
        ${preloaderImg}<strong>${titulo}</strong> <span id="texto-aviso">${mensaje}</span>
        <button id="cerrar-aviso" class="btn btn-outline-secondary btn-sm" style="display:${display}">Cerrar</button>
        </div>`;

    // Cerrar alerta al hacer clic en el boton cerrar
    if (display == "inline") {
        document.getElementById("cerrar-aviso").addEventListener("click", function () {
            contenedor.innerHTML = "";
        })
    }

    // Activar la redireccion
    if (redireccion) {
        setTimeout(() => {
            window.location.replace(redireccionUrl);
        }, 2000);
    }
}
