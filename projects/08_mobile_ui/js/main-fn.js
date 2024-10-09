class Utils {
    _constructor() {
        this.info = "Utilidades instanciadas."
    }

    static aviso_modal(title, message) {
        const modal = document.getElementById("aviso-modal");
        let titulo = modal.querySelector("#modal-title");
        let mensaje = modal.querySelector(".modal-body");
        titulo.innerText = title;
        mensaje.innerText = message;
        $("#aviso-modal").modal("show");
    }

    static preloader(status) {
        switch (status) {
            case "show":
                $("#preloader-modal").modal("show");
                break;
            case "hide":
                $("#preloader-modal").modal("hide");
                break;
        }
    }

    static crear_tabla(datos, contenedorID) {
        // Contenedor
        const contenedor = document.getElementById(contenedorID);
        contenedor.innerHTML = "";

        // Tabla
        const table = document.createElement("table");
        table.className = "table table-hover";
        table.id = `${contenedorID}-tbl`;

        // tHead
        const cols = Object.keys(datos[0]);
        const tHead = document.createElement("thead");
        tHead.className = "table-dark";
        const trHead = document.createElement("tr");
        cols.forEach(col => {
            let td = document.createElement("td");
            td.innerText = col;
            trHead.appendChild(td);
        })
        tHead.appendChild(trHead);

        // tBody
        const tBody = document.createElement("tbody");
        datos.forEach(row => {
            const tr = document.createElement("tr");
            for (let col in row) {
                const td = document.createElement("td");
                td.innerText = row[col];
                tr.appendChild(td);
            }
            tBody.appendChild(tr);
        })

        // Ensamblar tabla
        table.appendChild(tHead);
        table.appendChild(tBody);
        contenedor.appendChild(table);
    }

    static datos_sesion(cli = true) {
        // DATOS DE SESION
        if (cli) {
            const id = parseInt(Math.random() * 99999);
            document.getElementById("id-cliente").innerText = id;
            document.getElementById("cliente").value = id;
        }

        document.getElementById("fecha").innerText = new Date().toDateString();
        document.getElementById("saldo-actual-bs").innerText = (Math.random() * 10000).toFixed(2);
        document.getElementById("saldo-actual-usd").innerText = (Math.random() * 10000).toFixed(2);
        const credito = ["Credito 7 dias", "Credito 15 dias"];
        document.getElementById("ultimo-pago").innerText = Math.random() < 0.5 ? credito[0] : credito[1];
        document.getElementById("prepago-sugerido").innerText = (Math.random() * 1000).toFixed(2);
        document.getElementById("pago-pendiente").innerText = (Math.random() * 1000).toFixed(2);
    };

    static enviar_formulario(evt, num) {
        num--;
        const cli = document.getElementById("cliente").value;
        if (cli == 0) {
            Utils.aviso_modal("Aviso", "Primero debe seleccionar un cliente.");
        } else {
            let procesar = true;
            const modalBody = document.querySelector("#datos-enviados-modal .modal-body");
            modalBody.innerHTML = "";
            const ol = document.createElement("ol");
            const inp = Array.from(evt.target.elements);

            inp.forEach(e => {
                if (e.nodeName == "INPUT" && e.value == "") procesar = false;
            });

            if (procesar) {
                for (let i = 0; i <= num; i++) {
                    const li = document.createElement("li");
                    li.innerText = `${inp[i].name.replaceAll("-", " ")}: ${inp[i].value}`;
                    ol.appendChild(li);
                    inp[i].name == "monto-pago" ? Utils.cargar_pago(inp[i].value) : null;
                }
                const small = document.createElement("small");
                small.innerText = "Esto es solo un demo de los datos que se enviarian en el Request.";
                small.className = "text-warning";

                modalBody.appendChild(ol);
                modalBody.appendChild(small);

                $("#datos-enviados-modal").modal("show");
                evt.target.reset();
            } else {
                Utils.aviso_modal("Aviso", "Debe rellenar todos los campos.");
            }
        }
    }

    static estadisticas() {
        document.getElementById("jbp-clientes").innerText = parseInt(Math.random() * 100);
        document.getElementById("jbp-rentabilidad").innerText = `${(Math.random() * 100).toFixed(2)}%`;
        document.getElementById("jbp-volumen-ventas").innerText = (Math.random() * 1000).toFixed(2);
        document.getElementById("jbp-volumen-ventas-porcentaje").innerText = `${(Math.random() * 100).toFixed(2)}%`;
        document.getElementById("jbp-gestion-terceros").innerText = parseInt(Math.random() * 100);
        document.getElementById("jbp-gestion-terceros-porcentaje").innerText = `${(Math.random() * 100).toFixed(2)}%`;
        document.getElementById("otr-dat-cli-suspendidos").innerText = parseInt(Math.random() * 100);
        document.getElementById("otr-dat-cli-activos").innerText = parseInt(Math.random() * 100);
        document.getElementById("otr-dat-cli-inactivos").innerText = parseInt(Math.random() * 100);
        document.getElementById("otr-dat-cli-morosos").innerText = parseInt(Math.random() * 100);
        document.getElementById("otr-dat-cli-saldo").innerText = parseInt(Math.random() * 100);
        document.getElementById("otr-dat-gestion-terceros").innerText = `${parseInt(Math.random() * 10)}:${parseInt(Math.random() * 60)}`;
    }

    static cargar_pago(monto) {
        const tbody = document.querySelector("#ultimos-pagos-div-tbl tbody");
        const f = new Date();
        const fecha = `${f.getFullYear()}-${f.getMonth()}-${f.getDay()}`;
        const ref = `R${parseInt(Math.random() * 1000000)}`;
        const tipo = Math.random() < 0.5 ? "CASH" : "TRF";
        const dat = [fecha, ref, monto, tipo];
        const tr = document.createElement("tr");
        dat.forEach(val => {
            const td = document.createElement("td");
            td.innerText = val;
            tr.appendChild(td);
        })
        console.log(tr);
        tbody.appendChild(tr);
    }
}

export default Utils;