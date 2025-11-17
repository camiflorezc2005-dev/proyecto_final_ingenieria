/* ==================================
   MAIN.JS – CONTROLADOR GLOBAL
==================================== */

/* ----------- NAVEGACIÓN GLOBAL ----------- */

/**
 * Redirige a otra página del sistema
 * @param {string} page - nombre del archivo HTML
 */
function redirectTo(page) {
    window.location.href = page;
}

/**
 * Carga datos desde localStorage
 */
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Guarda datos en localStorage
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Generar ID automático
 */
function generateId() {
    return Date.now();
}

/* ----------- VERIFICAR SESIÓN DEL ESTUDIANTE ----------- */
function verificarSesion() {
    const user = localStorage.getItem("usuarioActivo");

    if (!user) {
        alert("Debes iniciar sesión.");
        redirectTo("login.html");
    }
}

/* ----------- CERRAR SESIÓN ----------- */
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    redirectTo("login.html");
}

/* ----------- MENSAJES GLOBALES ----------- */
function showMessage(msg) {
    const box = document.createElement("div");
    box.className = "alert";
    box.innerText = msg;

    document.body.prepend(box);

    setTimeout(() => box.remove(), 3000);
}
