import api from "./api";

const citaService = {
  listar: (id) => {
    return api.get(`personal/cita/personalAd/${id}`);
  },

  doctores: () => {
    return api.get('personal/doctor');
  },

  CitaDoc: (id) => {
    return api.get(`doctor/citas/${id}`);
  },

  guardar: (datos) => {
    return api.post("/personal/cita", datos);
  },

  mostrar: (id) => {
    return api.get(`/personal/cita/${id}`);
  },

  modificar: (id, datos) => {
    return api.patch(`/personal/cita/${id}`, datos);
  },

  eliminar: (id) => {
    return api.delete(`/personal/cita/${id}`);
  },

  docElimina: (id) => {
    return api.delete(`/doctor/cita/${id}`);
  },
};

export default citaService;
