import api from "./api";

const ciataService = {
  historiaPaciente: (id) => {
    return api.get(`historia/${id}`);
  },

  /* doctores: () => {
    return api.get('personal/doctor');
  } ,*/

  /* guardar: (datos) => {
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
  }, */
};

export default ciataService;