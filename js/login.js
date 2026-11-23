const formulario = document.getElementById("form-login");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const mensajeError = document.getElementById("mensaje-error");

// Usuario y contraseña 
const usuarioValido = "admin@viveroraiz.com";
const claveValida = "1234";

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const correo = campoCorreo.value;
    const contrasena = campoContrasena.value;


    if (correo === usuarioValido && contrasena === claveValida) {

        localStorage.setItem("sesionActiva", "true");
        localStorage.setItem("correoUsuario", correo);

        localStorage.setItem("nombreUsuario", "Admin");

        window.location.href = "catalogo.html";

    } else {

        mensajeError.textContent = "Usuario o contraseña incorrectos.";

    }

});
