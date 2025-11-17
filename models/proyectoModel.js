// models/ProyectoModel.js
import { Storage } from "./Storage.js";

export class ProyectoModel {
  static key = "proyectos";

  static create({ titulo, resumen, estudiante, programa }) {
    const proyecto = {
      id: Date.now().toString(),
      titulo,
      resumen,
      estudiante,
      programa,
      director: null,
      jurados: [],
      entregables: [], // {id, nombre, fecha, fase}
      sustentacion: null, // {fecha, hora, lugar}
      evaluaciones: [], // {jurado, nota, observaciones}
      estado: "Registrado",
      createdAt: new Date().toISOString()
    };
    Storage.push(ProyectoModel.key, proyecto);
    return proyecto;
  }

  static all() {
    return Storage.get(ProyectoModel.key);
  }

  static find(id) {
    return ProyectoModel.all().find(p => p.id === id);
  }

  static update(id, patch) {
    return Storage.updateById(ProyectoModel.key, id, patch);
  }

  // helpers used later in other features:
  static addDeliverable(id, fileMeta) {
    const p = ProyectoModel.find(id);
    if (!p) return false;
    p.entregables.push(fileMeta);
    return Storage.updateById(ProyectoModel.key, id, { entregables: p.entregables });
  }

  static assignDirector(id, directorObj) {
    return Storage.updateById(ProyectoModel.key, id, { director: directorObj, estado: "Con director asignado" });
  }

  static assignJurado(id, juradoObj) {
    const p = ProyectoModel.find(id);
    p.jurados.push(juradoObj);
    return Storage.updateById(ProyectoModel.key, id, { jurados: p.jurados });
  }

  static setSustentation(id, sust) {
    return Storage.updateById(ProyectoModel.key, id, { sustentacion: sust, estado: "Sustentación programada" });
  }

  static addEvaluation(id, evalObj) {
    const p = ProyectoModel.find(id);
    p.evaluaciones.push(evalObj);
    // compute final grade optionally
    let final = null;
    if (p.evaluaciones.length > 0) {
      const sum = p.evaluaciones.reduce((s,e)=>s+Number(e.nota),0);
      final = (sum / p.evaluaciones.length).toFixed(2);
    }
    return Storage.updateById(ProyectoModel.key, id, { evaluaciones: p.evaluaciones, calificacionFinal: final });
  }
}
