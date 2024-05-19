import api from "./api";

const pacienteService = {
  listar: (q = "", page = 1, limit = 10) => {
    return api.get(`/personal/paciente?q=${q}&page=${page}&limit=${limit}`);
  },
  listarDoc: (q = "", page = 1, limit = 10) => {
    return api.get(`/doctor/pacientes?q=${q}&page=${page}&limit=${limit}`);
  },
  listarLaboratorista: (q = "", page = 1, limit = 10) => {
    return api.get(
      `/laboratorista/pacientes?q=${q}&page=${page}&limit=${limit}`
    );
  },

  guardar: (datos) => {
    return api.post("/personal/paciente", datos);
  },

  foto: (id, datos) => {
    return api.post(`/personal/paciente/${id}/foto`, datos);
  },
  actualizarFoto: (id, datos) => {
    return api.post(`/personal/paciente/${id}/actualizar-foto`, datos);
  },

  mostrar: (id) => {
    return api.get(`/personal/paciente/${id}`);
  },

  modificar: (id, datos) => {
    return api.patch(`/personal/paciente/${id}`, datos);
  },

  eliminar: (id) => {
    return api.delete(`/personal/paciente/${id}`);
  },
};

export default pacienteService;
