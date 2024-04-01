import api from "./api";

const personalService = {
  listar: (q = "", page, limit) => {
    return api.get(`/admin/personalAd?q=${q}&page=${page}&limit=${limit}`);
  },

  guardar: (datos) => {
    return api.post("/admin/personalAd", datos);
  },

  foto: (id, datos) => {
    return api.post(`/admin/personalAd/${id}/foto`, datos);
  },

  actualizarFoto: (id, datos) => {
    return api.post(`/admin/personalAd/${id}/actualizar-foto`, datos);
  },

  mostrar: (id) => {
    return api.get(`/admin/personalAd/${id}`);
  },

  modificar: (id, datos) => {
    return api.patch(`/admin/personalAd/${id}`, datos);
  },

  eliminar: (id) => {
    return api.delete(`/admin/personalAd/${id}`);
  },
};

export default personalService;
