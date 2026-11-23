// Open-Meteo es una API pública y gratuita: no pide registro ni clave
const URL_CLIMA = "https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current=temperature_2m,wind_speed_10m";
// https://open-meteo.com/

// fetch devuelve una promesa; await espera la respuesta sin bloquear la página
async function mostrarClima() {
    const widget = document.getElementById("clima");
    try {
        const response = await fetch(URL_CLIMA);
        const datos = await response.json();
        widget.textContent = `Buenos Aires: ${datos.current.temperature_2m} °C · viento ${datos.current.wind_speed_10m} km/h`;
        console.log("llamando a la api");
    } catch (error) {
        widget.textContent = "Clima no disponible";
    }
}

console.log("pedimos el clima");
mostrarClima();

console.log("fin pedimos el clima");

