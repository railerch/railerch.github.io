import productos from "./productos.json" with { type: 'json'};
import * as fn from "./main-fn.js";

// Montos finales
class Totales {
    constructor() {
        this.subtotal = 0;
        this.total = 0;
        this.carrito = [];
    }

    get subTotal() {
        return this.subtotal;
    }

    set subTotal(val) {
        this.subtotal = val;
    }

    get montoTotal() {
        return this.total;
    }

    set montoTotal(val) {
        this.total = val;
    }

    get articulosCarrito() {
        return this.carrito
    }

    set articulosCarrito(producto) {
        this.carrito.push(producto);
    }

}

let totales = new Totales();

// Cargar productos
const cargarProductos = new Promise((done, fail) => {
    if (fn.cargar_productos_disponibles(productos)) {
        done(true);
    } else {
        fail("Error al renderizar los productos, intente nuevamente.");
    }
})

cargarProductos.then(() => {
    console.log("Productos disponibles renderizados.")

    // Acctivar listener para agregar productos al carrito y totalizar
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", evt => {
            const id = evt.target.getAttribute("data-product-id");
            fn.cargar_producto_carrito(productos, id, totales);
        })
    })
}).catch(err => console.error(err))

// Validar redireccion desde stripe
if (document.location.search.includes("confirmado")) {
    document.getElementById("confirmacion-pago").style.display = "block";
}



