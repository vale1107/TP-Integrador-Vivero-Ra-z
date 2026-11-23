
let plantas = [];

const grillaProductos = document.getElementById("productos-grid");
const campoBuscar = document.getElementById("buscar");
const campoCategoria = document.getElementById("categoria");
const campoOrdenar = document.getElementById("ordenar");
const botonFiltrar = document.querySelector(".contenedor-boton-filtro button");

// Se genera una tarjeta por cada planta
function crearTarjetaTexto(planta) {
    console.log("ID de la planta:", planta.id);

    const categoria = planta.categoria.toLowerCase();

    return `
        <article class="producto">
            <img src="${planta.foto}" alt="${planta.nombre}">
            <div class="info prod">
                <h3 class="boton-b boton-b-lleno">
                    ${planta.categoria}
                </h3>
                <p>${planta.nombre}</p>
                <p>${planta.nombreCientifico}</p>
                <p>$${Number(planta.precio).toLocaleString("es-AR")}</p>
                <a href="ficha.html?id=${planta.id}" class="ver ficha">VER FICHA →</a>
              
            </div>
        </article>
    `;
}

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/s$/, "")
        .trim();
}


function mostrarProductos() {

    const texto = campoBuscar.value.toLowerCase().trim();
    const categoriaElegida = campoCategoria.value;
    const ordenElegido = campoOrdenar.value;
    console.log("Texto ingresado:", texto);
    console.log("Categorías recibidas:", plantas.map(p => p.categoria));

    let plantasFiltradas = plantas.filter(function(planta) {

        const coincideNombre =
            planta.nombre.toLowerCase().includes(texto) ||
            planta.nombreCientifico.toLowerCase().includes(texto) ||
            planta.categoria.toLowerCase().includes(texto);

        const coincideCategoria =
            normalizarTexto(categoriaElegida) === "toda" ||
            normalizarTexto(planta.categoria) ===
            normalizarTexto(categoriaElegida);

        return coincideNombre && coincideCategoria;
    });

    if (ordenElegido === "Nombre (A-Z)") {
        plantasFiltradas.sort((a, b) =>
            a.nombre.localeCompare(b.nombre, "es")
        );
    } else if (ordenElegido === "Nombre (Z-A)") {
        plantasFiltradas.sort((a, b) =>
            b.nombre.localeCompare(a.nombre, "es")
        );
    } else if (ordenElegido === "Precio menor") {
        plantasFiltradas.sort((a, b) => a.precio - b.precio);
    } else if (ordenElegido === "Precio mayor") {
        plantasFiltradas.sort((a, b) => b.precio - a.precio);
    }

    if (plantasFiltradas.length === 0) {
        grillaProductos.innerHTML =
            "<p>No se encontraron plantas.</p>";
        return;
    }

    grillaProductos.innerHTML = plantasFiltradas
        .map(crearTarjetaTexto)
        .join("");
}


async function cargarPlantas() {

    try {
        grillaProductos.innerHTML = "<p>Cargando plantas...</p>";

        plantas = await obtenerPlantas();

        //console.log("Respuesta de la API:", plantas);

        mostrarProductos();
        console.log(plantas.map(p => ({
    id: p.id,
    nombre: p.nombre
})));


    } catch (error) {
        console.error("Error al cargar las plantas:", error);

        grillaProductos.innerHTML =
            "<p>No se pudo cargar el catálogo.</p>";
    }
}

// Eventos filtros
botonFiltrar.addEventListener("click", mostrarProductos);
campoBuscar.addEventListener("input", mostrarProductos);
campoCategoria.addEventListener("change", mostrarProductos);
campoOrdenar.addEventListener("change", mostrarProductos);

// Inicia la carga
cargarPlantas();
