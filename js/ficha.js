const detallePlanta = document.getElementById("detalle-planta");

// Seobtiene  ID que viene desde la dirección de la página
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// Consulta API para buscar una planta
async function mostrarFicha() {

    try {

        if (!id) {
            throw new Error("No se recibió el ID de la planta");
        }

       const response = await fetch(URL_API);

if (!response.ok) {
    throw new Error("No se pudo obtener el catálogo");
}

const plantas = await response.json();

const planta = plantas.find(function(p) {
    return String(p.id) === String(id);
});

if (!planta) {
    throw new Error("No se encontró la planta");
}

     // Se muestran losdatos de la planta
        detallePlanta.innerHTML = `
            <article class="ficha-detalle">

                <img src="${planta.foto}" alt="${planta.nombre}">

                <div class="ficha-informacion">

                    <h1>${planta.nombre}</h1>

                    <p><strong>Nombre científico:</strong>
                    ${planta.nombreCientifico}</p>

                    <p><strong>Categoría:</strong>
                    ${planta.categoria}</p>

                    <p><strong>Precio:</strong>
                    $${Number(planta.precio).toLocaleString("es-AR")}</p>

                    <p><strong>Stock disponible:</strong>
                    ${planta.stock}</p>

                    <p><strong>Iluminación:</strong>
                    ${planta.luz}</p>

                    <p><strong>Riego:</strong>
                    ${planta.riego}</p>

                    <p><strong>Fecha de ingreso:</strong>
                    ${planta.fechaIngreso}</p>

                    <p><strong>Etiquetas:</strong>
                    ${(planta.etiquetas || []).join(", ")}</p>

                    <p><strong>Notas:</strong>
                    ${planta.notas || "Sin notas"}</p>

                </div>
            </article>
        `;

    } catch (error) {

        detallePlanta.innerHTML =
            "<p>No se pudo cargar la información de la planta.</p>";

        console.error(error);
    }
}


mostrarFicha();
