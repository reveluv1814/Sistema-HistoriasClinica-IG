import api from "./api";

const adminService = {
  rolesAdmin: (id) => {
    return api.get(`/admin/rol/${id}`);
  },
  guardar: (datos) => {
    return api.post("/admin/", datos);
  },
  listar: (q = "", page = 1, limit = 10) => {
    return api.get(`/admin/?q=${q}&page=${page}&limit=${limit}`);
  },
  modificar: (id, datos) => {
    return api.patch(`/admin/${id}`, datos);
  },
  mostrar: (id) => {
    return api.get(`/admin/${id}`);
  },
};

export default adminService;
