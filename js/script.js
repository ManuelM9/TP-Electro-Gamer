document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formulario");

    form.addEventListener("submit", (e) => {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !email || !mensaje || !email.includes("@")) {
            e.preventDefault();
            alert("Por favor, completá todos los campos correctamente.");
        }
    });

    const productosContenedor = document.querySelector(".productos_contenedor");

    fetch("./js/producto.json")
        .then(res => res.json())
        .then(productos => {
            productosContenedor.innerHTML = "";
            productos.forEach(prod => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button data-id="${prod.id}" id="boton">Añadir al carrito</button>
      `;
                productosContenedor.appendChild(card);
            });
            activarBotones();
        });


    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const actualizarStorage = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContador();
    };

    const activarBotones = () => {
        const botones = document.querySelectorAll(".card button");
        botones.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                const card = e.target.parentElement;
                const nombre = card.querySelector("h3").textContent;
                const precio = parseFloat(card.querySelector("p").textContent.replace("$", ""));
                const imagen = card.querySelector("img").src;

                const existente = carrito.find(p => p.id == id);
                if (existente) {
                    existente.cantidad++;
                } else {
                    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
                }

                actualizarStorage();
                alert("Producto añadido exitosamente al carrito");
            });
        });
    };

    const actualizarContador = () => {
        let contador = document.getElementById("contador-carrito");
        if (!contador) {
            contador = document.createElement("a");
            contador.id = "contador-carrito";
            contador.classList.add("contador");
            contador.href = "carrito.html";
            document.body.appendChild(contador);
        }
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.textContent = `🛒 Carrito: ${total}`;
    };

    actualizarContador();
});