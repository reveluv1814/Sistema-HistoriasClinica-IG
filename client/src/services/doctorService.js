import api from "./api";

const doctorService = {
  listar: (q = "", page = 1, limit = 10) => {
    return api.get(`/admin/doctor?q=${q}&page=${page}&limit=${limit}`);
  },

  guardar: (datos) => {
    return api.post("/admin/doctor", datos);
  },
  foto: (id, datos) => {
    return api.post(`/admin/doctor/${id}/foto`, datos);
  },
  actualizarFoto: (id, datos) => {
    return api.post(`/admin/doctor/${id}/actualizar-foto`, datos);
  },
  mostrar: (id) => {
    return api.get(`/admin/doctor/${id}`);
  },

  modificar: (id, datos) => {
    return api.patch(`/admin/doctor/${id}`, datos);
  },

  eliminar: (id) => {
    return api.delete(`/admin/doctor/${id}`);
  },
};

export default doctorService;
