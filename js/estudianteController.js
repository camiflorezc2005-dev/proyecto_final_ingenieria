// js/estudianteController.js
import { ProyectoModel } from "../models/proyectoModel.js";

// optional: get student from query or session; here we show all
function render() {
  const list = document.getElementById("misProyectos");
  const proyectos = ProyectoModel.all();
  if (proyectos.length === 0) {
    list.innerHTML = "<li>No tienes proyectos registrados.</li>";
    return;
  }
  list.innerHTML = proyectos.map(p => `
    <li>
      <div>
        <strong>${p.titulo}</strong><br>
        <small>${p.programa} — ${p.estudiante}</small>
      </div>
      <div style="text-align:right">
        <div class="pill">${p.estado || 'Sin estado'}</div>
        <div style="font-size:12px;color:#666;margin-top:6px">Calif. final: ${p.calificacionFinal || 'N/A'}</div>
      </div>
    </li>
  `).join("");
}
document.addEventListener("DOMContentLoaded", render);
