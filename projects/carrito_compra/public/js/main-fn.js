export function cargar_productos_disponibles(productos) {
    const contenedor = document.querySelector("#products .card-body");

    productos.forEach(p => {
        const card = document.createElement('div');
        card.classList = "product mb-2";
        card.innerHTML = `
                <figure class="col-4 m-0">
                    <img src="${p.imagen}">
                </figure>
                
                <div class="col-4 d-flex justify-content-between">
                    <div class="description">
                    <p class="m-0">${p.nombre}</p>
                    </div>
                    <div>
                        $<span class="price">${p.precio}</span>
                    </div>
                </div>

                <div class="col-4 btn">
                        <i class="bi bi-cart btn btn-outline-primary add-cart" title="Agregar al carrito" data-product-id="${p.id}"></i>
                </div>
        `

        contenedor.appendChild(card);
    });

    return true;
}

export function cargar_producto_carrito(productos, id, totales) {
    // Contenedor
    const carrito = document.getElementById("cart-products");

    // Buscar datos del producto y disminuir stock
    let tmp = stock(productos, totales.articulosCarrito, id);

    // No procesar si el stock esta en cero
    if (tmp) {
        carrito.innerHTML = "";

        // Buscar producto en el carrito
        const pEnCarrito = totales.articulosCarrito.find(p => p.id == id);

        // Si esta se actualiza el precio y la cantidad
        if (pEnCarrito) {
            pEnCarrito.precio += parseFloat(tmp.precio);
            pEnCarrito.cantidad += 1;
        } else {
            // Agregar producto al contenedor en la clase
            let p = { ...tmp }; // Clonar el objeto para evitar los cambios por referencia
            p.cantidad = 1;
            totales.articulosCarrito = p;
        }

        // Renderizar producto en UI
        totales.articulosCarrito.forEach(p => {
            const div = document.createElement("div");
            div.classList = "d-flex border-bottom-1 justify-content-between mb-2";
            div.innerHTML = `
                <div class="col-6">
                    <span>${p.nombre}</span><span id="cantidad"> x ${p.cantidad}</span>
                </div>
                <div class="col-6 d-flex justify-content-between">
                    <span>$${parseFloat(p.precio).toFixed(2)}</span>
                    <i class="bi bi-trash btn btn-outline-danger btn-sm delete" data-product-id="${p.id}"></i>
                </div>
            `
            // Renderizar articulo en UI
            carrito.appendChild(div);

            // Calcular totales
            calcular_totales(totales.articulosCarrito, totales);

            // Bloquear campo de descuento si el carrito ya tiene articulos en la cesta
            // Desbloquear boton de pago
            if (carrito.childElementCount > 0) {
                document.getElementById("porcentaje-descuento").setAttribute("disabled", true);
                document.getElementById("pago-btn").removeAttribute("disabled");
            }

            // Eliminar productos del carrito
            div.querySelector(".delete").addEventListener("click", evt => {
                const id = evt.target.getAttribute("data-product-id");

                // Restaurar el stock
                stock(productos, totales.articulosCarrito, id, true);

                // Eliminar el elemento del carrito
                const i = totales.articulosCarrito.findIndex(p => p.id == id);
                totales.articulosCarrito.splice(i, 1);

                // Eliminar elemento del UI
                div.remove();

                // Recalcular montos
                calcular_totales(totales.articulosCarrito, totales);

                // Desbloquear campo de descuento si el carrito esta vacio
                // Bloquear boton de pago
                if (carrito.childElementCount == 0) {
                    document.getElementById("porcentaje-descuento").removeAttribute("disabled");
                    document.getElementById("pago-btn").setAttribute("disabled", true);
                }
            })
        })
    }
}

export function stock(productos, productosCarrito, id, restaurar = false) {
    const infoStock = document.getElementById("info-stock-alert");
    let ptNombre = document.getElementById("info-nombre-articulo");
    let ptStock = document.getElementById("info-stock-articulo");

    // Restaurar o disminuir stock
    if (restaurar) {
        // Buscar producto en el carrito
        let tmp = productosCarrito.find(p => p.id == id);

        // Buscar datos del producto y restaurar stock
        productos.find(p => {
            if (p.id == tmp.id) {
                p.stock += tmp.cantidad
                ptNombre.textContent = p.nombre;
                ptStock.textContent = p.stock;
                ptStock.parentNode.className = "badge bg-secondary";
            }
        });
    } else {
        // Buscar datos del producto y disminuir stock
        return productos.find(p => {
            // No continuar si el stock ya esta en cero
            if (p.id == id && p.stock == 0) {
                ptNombre.textContent = p.nombre;
                ptStock.textContent = p.stock;
                ptStock.parentNode.className = "badge bg-danger";
                return false;
            }

            if (p.id == id) {
                // Restaurar color del badge
                ptStock.parentNode.className = "badge bg-secondary";

                // Disminuir stock si es mayor a cero
                if (p.stock > 0) {
                    p.stock -= 1
                }

                // Stock en minimo
                if (p.stock <= 3) {
                    ptStock.parentNode.className = "badge bg-warning";
                }

                // Stock en cero
                if (p.stock == 0) {
                    ptStock.parentNode.className = "badge bg-danger";
                }

                ptNombre.textContent = p.nombre;
                ptStock.textContent = p.stock;

                return p;
            }
        });
    }
}

function calcular_totales(art, ttl) {
    let porcDescuento = parseFloat(document.getElementById("porcentaje-descuento").value);

    // Reiniciar subtotal para evitar diplicar los montos
    ttl.subTotal = 0;

    // Sumar los montos totales de cada articulo en el carrito
    art.forEach(pt => {
        ttl.subTotal += pt.precio;
    })

    // Calcular el descuento
    let montoDescuento = ttl.subTotal * porcDescuento / 100;

    // Calcular el total del pago
    ttl.montoTotal = ttl.subTotal - montoDescuento;

    // Renderizar montos totales
    document.getElementById("sub-total").textContent = parseFloat(ttl.subTotal).toFixed(2);
    document.getElementById("descuento").textContent = parseFloat(montoDescuento).toFixed(2);
    document.getElementById("total").textContent = parseFloat(ttl.montoTotal).toFixed(2);
}

/*
En JavaScript almacenar una instancia de un objeto en otra no hace que estos sean diferentes, lo que conlleva a que los cambios
realizados en uno se apliquen en el otro. Para evitar este inconveniente, el obj se debe clonar.

Formas de clonar un objeto:

// Spread Method
let clone = { ...userDetails }

// Object.assign() Method
let clone = Object.assign({}, userDetails)

// JSON.parse() Method
let clone = JSON.parse(JSON.stringify(userDetails))
*/


