// js/entregablesController.js
import { ProyectoModel } from "../models/proyectoModel.js";

const select = document.getElementById("selectProyecto");
const btnSubir = document.getElementById("btnSubir");
const lista = document.getElementById("listaEntregables");

function loadProjects() {
  const proyectos = ProyectoModel.all();
  select.innerHTML = `<option value="">-- Seleccione --</option>` + proyectos.map(p=>`<option value="${p.id}">${p.titulo} (${p.estudiante})</option>`).join("");
}
function renderEntregables(projId) {
  lista.innerHTML = "";
  if(!projId) return;
  const p = ProyectoModel.find(projId);
  p.entregables.forEach(e=>{
    const li = document.createElement("li");
    li.textContent = `${e.fase} — ${e.nombre} — ${new Date(e.fecha).toLocaleString()}`;
    lista.appendChild(li);
  });
}

select.addEventListener("change", ()=> renderEntregables(select.value));

btnSubir.addEventListener("click", () => {
  const id = select.value;
  const nombre = document.getElementById("nombreArchivo").value.trim();
  const fase = document.getElementById("fase").value.trim() || "General";
  if(!id || !nombre) { alert("Seleccione proyecto y nombre de archivo"); return; }
  const meta = { id: Date.now().toString(), nombre, fase, fecha: new Date().toISOString() };
  ProyectoModel.addDeliverable(id, meta);
  renderEntregables(id);
  alert("Entregable agregado (simulado)");
  document.getElementById("nombreArchivo").value = "";
}

);

loadProjects();
