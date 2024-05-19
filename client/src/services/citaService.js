import api from "./api";

const citaService = {
  listar: (id) => {
    return api.get(`personal/cita`);
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
  docConsulta: (id,datos)=>{
    return api.patch(`/doctor/cita/${id}`,datos)
  },
  verConsulta: (id) => {
    return api.get(`/doctor/cita/${id}`);
  },
};

export default citaService;
