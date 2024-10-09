import Utils from "./main-fn.js";

if (window.location.pathname.includes("login")) {
    sessionStorage.clear();

    // INICIAR SESION
    document.getElementById("login-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        const datos = evt.target.elements;
        if (datos[0].value.toLowerCase() == "admin" && datos[1].value == 1234) {
            sessionStorage.setItem("auth", true);
            sessionStorage.setItem("user", "Administrador");
            Utils.preloader("show");
            setTimeout(() => {
                window.location.replace("jbp-admin.html");
            }, 2000);
        } else if (datos[0].value.toLowerCase() == "client" && datos[1].value == 1234) {
            sessionStorage.setItem("auth", true);
            sessionStorage.setItem("user", "Cliente")
            Utils.preloader("show");
            setTimeout(() => {
                window.location.replace("jbp-client.html");
            }, 2000);
        } else {
            Utils.aviso_modal("Error", "Datos invalidos");
        }
    })

    // SOLICITAR MEMBRESIA
    document.getElementById("membresia-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        Utils.enviar_formulario(evt, 4);
    })
} else if (window.location.pathname.includes("admin")) {
    const clientesArr = [
        {
            nombre: "Jhon Doe",
            indenti: "15896698",
            direccion: "Miami, 35st, FL",
            ult_recargas: [
                {
                    BLT: "4589",
                    Fecha: "2023-05-12",
                    Localidad: "Miami",
                    UOM: "458"
                },
                {
                    BLT: "8562",
                    Fecha: "2023-06-04",
                    Localidad: "Caracas",
                    UOM: "857"
                },
                {
                    BLT: "9652",
                    Fecha: "2023-08-19",
                    Localidad: "Valencia",
                    UOM: "963"
                }
            ],
            ult_pagos: [
                {
                    Fecha: "2023-05-15",
                    Ref: "R785696",
                    Monto: 59.05,
                    Tipo: "CASH"
                },
                {
                    Fecha: "2023-06-24",
                    Ref: "R785458",
                    Monto: 84.10,
                    Tipo: "TRF"
                },
                {
                    Fecha: "2023-08-10",
                    Ref: "R785123",
                    Monto: 123.05,
                    Tipo: "CASH"
                },
            ]

        },
        {
            nombre: "Pete Zoo",
            indenti: "10589632",
            direccion: "Washintong DC, 9st",
            ult_recargas: [
                {
                    BLT: "1234",
                    Fecha: "2023-01-13",
                    Localidad: "Miami",
                    UOM: "258"
                },
                {
                    BLT: "1235",
                    Fecha: "2023-03-08",
                    Localidad: "La guaira",
                    UOM: "148"
                },
                {
                    BLT: "1236",
                    Fecha: "2023-11-19",
                    Localidad: "Zulia",
                    UOM: "745"
                }
            ],
            ult_pagos: [
                {
                    Fecha: "2023-03-17",
                    Ref: "R784125",
                    Monto: 75.36,
                    Tipo: "CASH"
                },
                {
                    Fecha: "2023-02-24",
                    Ref: "R7878596",
                    Monto: 23.36,
                    Tipo: "TRF"
                },
                {
                    Fecha: "2023-12-10",
                    Ref: "R785857",
                    Monto: 350.26,
                    Tipo: "CASH"
                },
            ]

        }
    ]

    // CARGAR CLIENTES
    const clientes = document.getElementById("cliente");
    clientesArr.forEach(cli => {
        const opt = document.createElement("option");
        opt.value = cli.indenti;
        opt.innerText = cli.nombre;
        clientes.appendChild(opt);
    })

    document.getElementById("cliente").addEventListener("change", function () {
        const id = this.selectedOptions[0].value;
        clientesArr.forEach(cli => {
            if (cli.indenti == id) {
                // DATOS DE SESION
                Utils.datos_sesion(false)

                // ULTIMAS RECARGAS
                Utils.crear_tabla(cli.ult_recargas, "ultimas-recargas-div");

                // ULTIMOS PAGOS
                Utils.crear_tabla(cli.ult_pagos, "ultimos-pagos-div");
            }
        })

    })

    // SOLICITUD DE COMBUSTIBLE
    document.getElementById("solicitud-combustible-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        Utils.enviar_formulario(evt, 11);
    })

    // CARGAR PAGO
    document.getElementById("cargar-pago-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        Utils.enviar_formulario(evt, 1);
    })

    // ACTUALIZAR DATOS DEL CLIENTE
    document.getElementById("actualizar-datos-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        Utils.enviar_formulario(evt, 3);
    })

    // ESTADISTICAS
    Utils.estadisticas();

} else if (window.location.pathname.includes("client")) {
    // DATOS DE SESION
    Utils.datos_sesion()

    // SOLICITUD DE COMBUSTIBLE
    document.getElementById("solicitud-combustible-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        Utils.enviar_formulario(evt, 11);
    })

    // ACTUALIZAR DATOS DEL CLIENTE
    document.getElementById("actualizar-datos-frm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        Utils.enviar_formulario(evt, 3);
    })

    // NOTICIAS
    const noticiasDiv = document.getElementById("noticias-div");
    const noticias = [
        {
            img: "img/noticia-img-01.jpg",
            titulo: "Lorem ipsum #1",
            texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eos quo facilis nemo, magnam error."
        },
        {
            img: "img/noticia-img-02.jpg",
            titulo: "Lorem ipsum #2",
            texto: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, facilis?"
        },
        {
            img: "img/noticia-img-03.jpg",
            titulo: "Lorem ipsum #",
            texto: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto repellendus nulla voluptas? Alias, dolorum debitis! In, doloribus unde!"
        },
        {
            img: "img/noticia-img-04.jpg",
            titulo: "Lorem ipsum #4",
            texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet itaque ducimus omnis dignissimos dicta laborum laboriosam. Repellendus debitis minima quos."
        },
    ]

    noticias.forEach(n => {
        const div = document.createElement("div");
        div.innerHTML = `
                                <div class="card mb-2">
                                    <div class="card-body d-flex p-0 py-2">
                                        <div class="col-3 p-2">
                                            <img class="card-img-top" src="${n.img}" alt="Title">
                                        </div>
                                        <div class="col-9 text-muted p-2">
                                            <h4 class="card-title">${n.titulo}</h4>
                                            <p class="card-text">${n.texto}</p>
                                        </div>
                                    </div>
                                </div>
        `;

        noticiasDiv.append(div);
    })

    // Noticias modal
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function () {
            const modalBody = document.querySelector("#noticias-modal .modal-body");
            const modalHead = document.querySelector("#noticias-modal .modal-title");
            modalBody.innerHTML = "";

            modalHead.innerText = this.querySelector(".card-title").innerText;

            const img = document.createElement("img");
            img.classList.add("img-fluid");
            img.src = this.querySelector(".card-img-top").src;

            const sep = document.createElement("hr");

            const text = document.createElement("p");
            text.innerText = this.querySelector(".card-text").innerText;

            modalBody.appendChild(img);
            modalBody.appendChild(sep);
            modalBody.appendChild(text);

            $("#noticias-modal").modal("show");
        })
    })

}