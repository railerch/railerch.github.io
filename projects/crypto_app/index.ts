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
function mostrar_hora_actual(): void {
    const tiempo = new Date();
    hr.textContent = String(tiempo.getHours()).padStart(2, "0");
    min.textContent = String(tiempo.getMinutes()).padStart(2, "0");
    sec.textContent = String(tiempo.getSeconds()).padStart(2, "0");
    setTimeout(mostrar_hora_actual, 1000);
}
mostrar_hora_actual();

// Actualizar precios automaticamente
let isUpdating: boolean = false;
let up: any;
document.getElementById("actualizar-chkbox").addEventListener("click", (evt) => {
    if (isUpdating) {
        clearInterval(up);
        console.log("Actualizacion automatica detenida")
        isUpdating = false;
        filtroDiv?.style.display = "flex";
    } else {
        up = setInterval(() => {
            consultar_criptos();
            console.log("Actualizando");
        }, 1000)
        isUpdating = true;
        filtro?.value = "";
        filtroDiv?.style.display = "none";
        console.log("Actualizacion automatica iniciada");
    }
})

// BINANCE API
const binanceAPI: string = "https://api.binance.com";
const preciosEndPoint = "/api/v3/ticker/price";

// Probar conectividad
fetch(`${binanceAPI}/api/v3/ping`)
    .then(res => res.json())
    .then(res => {
        if (res) {
            consultar_criptos();
        } else {
            avisoConex?.style.display = "none";
            msgDiv?.style.display = "block";
            msgTxt?.textContent = "Error en conexión";
        }
    })
    .catch(err => console.log(err));

//  Consultar monedas
function consultar_criptos(): void {
    fetch(binanceAPI + preciosEndPoint)
        .then(res => res.json())
        .then(res => {
            if (res) {
                avisoConex?.style.display = "none";
                tablaDiv?.style.display = "block";
                crear_tabla(res);
            } else {
                avisoConex?.style.display = "none";
                msgDiv?.style.display = "block";
                msgTxt?.textContent = "Error en consulta";
            }
        })
        .catch(err => console.log(err));
}

// Cargar datos en tabla
function crear_tabla(data: object[]): void {
    registrosTotales?.textContent = data.length;
    coincidenciasBusqueda?.textContent = data.length;
    const tBody = document.querySelector("#tabla-div table tbody");
    tBody?.innerHTML = "";

    data.forEach(coin => {
        const tr = document.createElement("tr");
        for (let col in coin) {
            let td = document.createElement("td");
            td.textContent = coin[col];
            tr.appendChild(td);
        }
        tBody?.append(tr);
    })
}

// Filtro
filtro?.addEventListener("keyup", (evt) => {
    let txt = evt.target.value.toUpperCase();
    let i = 0;

    document.querySelectorAll("table tbody tr").forEach(tr => {
        if (tr.textContent?.includes(txt)) {
            tr.style.display = "table-row";
            i++;
        } else {
            tr.style.display = "none";
        }
    })

    // Validar coincidencias
    if (i == 0) {
        tablaDiv?.style.display = "none";
        msgDiv?.style.display = "block";
        msgDiv?.style.backgroundColor = "darkorange";
        msgTxt?.textContent = "Sin coincidencias";

        setTimeout(() => {
            evt.target.value = "";
            tablaDiv?.style.display = "block";
            msgDiv?.style.display = "none";
            msgDiv?.style.backgroundColor = "unset";
            msgTxt?.textContent = "";

            document.querySelectorAll("table tbody tr").forEach(tr => {
                tr.style.display = "table-row";
            })

            coincidenciasBusqueda?.textContent = document.querySelectorAll("table tbody tr").length;
        }, 2000)
    } else {
        coincidenciasBusqueda?.textContent = i;
    }
})

//  Limpiar filtro
document.getElementById("limpiar-filtro-btn")?.addEventListener("click", (evt) => {
    const registros = document.querySelectorAll("table tbody tr");
    filtro.value = "";
    coincidenciasBusqueda?.textContent = registros.length;
    registros.forEach(tr => {
        tr.style.display = "table-row";
    })
})