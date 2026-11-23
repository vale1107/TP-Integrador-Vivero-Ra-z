const URL_API = "https://6ae0a63fbe3bc8fead97a7c0.mockapi.io/api/plantas";


async function obtenerPlantas() {
    const response = await fetch(URL_API);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

async function probarAPI() {
    try {
        const response = await fetch(URL_API);

        console.log("Estado de la API:", response.status);

        const datos = await response.json();

        console.log("Datos recibidos:", datos);

    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

probarAPI();