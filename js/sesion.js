const botonCerrarSesion = document.getElementById("cerrar-sesion");
const saludoUsuario = document.getElementById("saludo-usuario");

// Se verifica si hay una sesión activa

if (localStorage.getItem("sesionActiva") === "true") {

    // Saludo y el botón
    const nombre = localStorage.getItem("nombreUsuario");

    saludoUsuario.textContent = "¡Hola, " + nombre + "!";
    botonCerrarSesion.style.display = "inline-block";

} else {

    // Se oculta saludo y botón
    saludoUsuario.textContent = "";
    botonCerrarSesion.style.display = "none";
}


// Ser cierra sesión al hacer click
botonCerrarSesion.addEventListener("click", function(event) {
    event.preventDefault();

    if (localStorage.getItem("sesionActiva") === "true") {
        localStorage.removeItem("sesionActiva");
        localStorage.removeItem("correoUsuario");
        localStorage.removeItem("nombreUsuario");
        window.location.href = "login.html";
    }
});
