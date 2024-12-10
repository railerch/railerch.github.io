"use strict";
var _a;
const hr = document.getElementById("horas");
const min = document.getElementById("minutos");
const sec = document.getElementById("segundos");
const avisoConex = document.getElementById("preloader-div");
const tablaDiv = document.getElementById("tabla-div");
const tablaWrap = document.getElementById("tabla-wrapper");
const msgDiv = document.getElementById("msg-div");
const msgTxt = document.getElementById("mensaje");
const coincidenciasBusqueda = document.getElementById("coincidencias-totales-lbl");
const registrosTotales = document.getElementById("registros-totales-lbl");
const filtroDiv = document.getElementById("filtro-div");
const filtro = document.getElementById("filtro-in");
// Hora actual
function mostrar_hora_actual() {
    const tiempo = new Date();
    hr.textContent = String(tiempo.getHours()).padStart(2, "0");
    min.textContent = String(tiempo.getMinutes()).padStart(2, "0");
    sec.textContent = String(tiempo.getSeconds()).padStart(2, "0");
    setTimeout(mostrar_hora_actual, 1000);
}
mostrar_hora_actual();
// Actualizar precios automaticamente
let isUpdating = false;
let up;
document.getElementById("actualizar-chkbox").addEventListener("click", (evt) => {
    if (isUpdating) {
        clearInterval(up);
        console.log("Actualizacion automatica detenida");
        isUpdating = false;
        filtroDiv === null || filtroDiv === void 0 ? void 0 : filtroDiv.style.display = "flex";
    }
    else {
        up = setInterval(() => {
            consultar_criptos();
            console.log("Actualizando");
        }, 1000);
        isUpdating = true;
        filtro === null || filtro === void 0 ? void 0 : filtro.value = "";
        filtroDiv === null || filtroDiv === void 0 ? void 0 : filtroDiv.style.display = "none";
        console.log("Actualizacion automatica iniciada");
    }
});
// BINANCE API
const binanceAPI = "https://api.binance.com";
const preciosEndPoint = "/api/v3/ticker/price";
// Probar conectividad
fetch(`${binanceAPI}/api/v3/ping`)
    .then(res => res.json())
    .then(res => {
    if (res) {
        consultar_criptos();
    }
    else {
        avisoConex === null || avisoConex === void 0 ? void 0 : avisoConex.style.display = "none";
        msgDiv === null || msgDiv === void 0 ? void 0 : msgDiv.style.display = "block";
        msgTxt === null || msgTxt === void 0 ? void 0 : msgTxt.textContent = "Error en conexión";
    }
})
    .catch(err => console.log(err));
//  Consultar monedas
function consultar_criptos() {
    fetch(binanceAPI + preciosEndPoint)
        .then(res => res.json())
        .then(res => {
        if (res) {
            avisoConex === null || avisoConex === void 0 ? void 0 : avisoConex.style.display = "none";
            tablaDiv === null || tablaDiv === void 0 ? void 0 : tablaDiv.style.display = "block";
            crear_tabla(res);
        }
        else {
            avisoConex === null || avisoConex === void 0 ? void 0 : avisoConex.style.display = "none";
            msgDiv === null || msgDiv === void 0 ? void 0 : msgDiv.style.display = "block";
            msgTxt === null || msgTxt === void 0 ? void 0 : msgTxt.textContent = "Error en consulta";
        }
    })
        .catch(err => console.log(err));
}
// Cargar datos en tabla
function crear_tabla(data) {
    registrosTotales === null || registrosTotales === void 0 ? void 0 : registrosTotales.textContent = data.length;
    coincidenciasBusqueda === null || coincidenciasBusqueda === void 0 ? void 0 : coincidenciasBusqueda.textContent = data.length;
    const tBody = document.querySelector("#tabla-div table tbody");
    tBody === null || tBody === void 0 ? void 0 : tBody.innerHTML = "";
    data.forEach(coin => {
        const tr = document.createElement("tr");
        for (let col in coin) {
            let td = document.createElement("td");
            td.textContent = coin[col];
            tr.appendChild(td);
        }
        tBody === null || tBody === void 0 ? void 0 : tBody.append(tr);
    });
}
// Filtro
filtro === null || filtro === void 0 ? void 0 : filtro.addEventListener("keyup", (evt) => {
    let txt = evt.target.value.toUpperCase();
    let i = 0;
    document.querySelectorAll("table tbody tr").forEach(tr => {
        var _a;
        if ((_a = tr.textContent) === null || _a === void 0 ? void 0 : _a.includes(txt)) {
            tr.style.display = "table-row";
            i++;
        }
        else {
            tr.style.display = "none";
        }
    });
    // Validar coincidencias
    if (i == 0) {
        tablaDiv === null || tablaDiv === void 0 ? void 0 : tablaDiv.style.display = "none";
        msgDiv === null || msgDiv === void 0 ? void 0 : msgDiv.style.display = "block";
        msgDiv === null || msgDiv === void 0 ? void 0 : msgDiv.style.backgroundColor = "darkorange";
        msgTxt === null || msgTxt === void 0 ? void 0 : msgTxt.textContent = "Sin coincidencias";
        setTimeout(() => {
            evt.target.value = "";
            tablaDiv === null || tablaDiv === void 0 ? void 0 : tablaDiv.style.display = "block";
            msgDiv === null || msgDiv === void 0 ? void 0 : msgDiv.style.display = "none";
            msgDiv === null || msgDiv === void 0 ? void 0 : msgDiv.style.backgroundColor = "unset";
            msgTxt === null || msgTxt === void 0 ? void 0 : msgTxt.textContent = "";
            document.querySelectorAll("table tbody tr").forEach(tr => {
                tr.style.display = "table-row";
            });
            coincidenciasBusqueda === null || coincidenciasBusqueda === void 0 ? void 0 : coincidenciasBusqueda.textContent = document.querySelectorAll("table tbody tr").length;
        }, 2000);
    }
    else {
        coincidenciasBusqueda === null || coincidenciasBusqueda === void 0 ? void 0 : coincidenciasBusqueda.textContent = i;
    }
});
//  Limpiar filtro
(_a = document.getElementById("limpiar-filtro-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (evt) => {
    const registros = document.querySelectorAll("table tbody tr");
    filtro.value = "";
    coincidenciasBusqueda === null || coincidenciasBusqueda === void 0 ? void 0 : coincidenciasBusqueda.textContent = registros.length;
    registros.forEach(tr => {
        tr.style.display = "table-row";
    });
});
