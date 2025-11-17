import { ProyectoModel } from "../models/proyectoModel.js";

document.getElementById("btnRegistrar").addEventListener("click", () => {
    const titulo = document.getElementById("titulo").value;
    const resumen = document.getElementById("resumen").value;
    const estudiante = document.getElementById("estudiante").value;
    const programa = document.getElementById("programa").value;

    const proyecto = new ProyectoModel(titulo, resumen, estudiante, programa);
    ProyectoModel.add(proyecto);

    alert("Proyecto registrado con éxito");
    window.location.href = "estudiante.html";
});
