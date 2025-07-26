document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("carrito_contenedor");
    const totalCompra = document.getElementById("total_compra");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderizarCarrito = () => {
        contenedor.innerHTML = "";

        if (carrito.length === 0) {
            contenedor.innerHTML = '<p>Tu carrito está vacío. <a class="link" href="index.html">Añadir productos</a></p>';
            totalCompra.textContent = "";
            return;
        }

        carrito.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("card");
            itemDiv.style.marginBottom = "20px";
            itemDiv.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" style="height:130px; width: 100%;">
                <h3>${item.nombre}</h3>
                <p>Precio: $${item.precio}</p>
                <p>Cantidad:
                    <button id="operacion" class="restar" data-index="${index}">-</button> 
                    ${item.cantidad}
                    <button id="operacion" class="sumar" data-index="${index}">+</button>
                </p>
                <p>Subtotal: $${item.precio * item.cantidad}</p>
                <button id="boton" class="eliminar" data-index="${index}">Eliminar</button>
            `;
            contenedor.appendChild(itemDiv);
        });

        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        totalCompra.innerHTML = `
    Total a pagar: $${total} 
    <br>
    <button id="boton_comprar" class="boton">Comprar</button>
`;

        const botonComprar = document.getElementById("boton_comprar");

        botonComprar.addEventListener("click", () => {
            alert("¡Compra realizada exitosamente!");
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        });
    };

    contenedor.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("sumar")) {
            carrito[index].cantidad++;
        } else if (e.target.classList.contains("restar")) {
            carrito[index].cantidad = Math.max(1, carrito[index].cantidad - 1);
        } else if (e.target.classList.contains("eliminar")) {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    });

    renderizarCarrito();
});