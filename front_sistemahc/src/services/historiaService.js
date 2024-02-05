import api from "./api";

const historiaService = {
  historiaPaciente: (id) => {
    return api.get(`historia/${id}`);
  },
  historiaFormList: (id) => {
    return api.get(`historia/form/${id}`);
  },
  verApartados:(id)=>{
    return api.get(`historia/apartados/${id}`);
  },
  guardarAntecedenteF: (id,datos) => {
    return api.post(`historia/antecedenteF/${id}`, datos);
  },
  editarAntecedenteF: (id,datos) => {
    return api.patch(`historia/antecedenteF/${id}`, datos);
  },
  motivoConsulta: (id,datos)=>{
    return api.patch(`/doctor/cita/${id}`,datos)
  },
  /* doctores: () => {
    return api.get('personal/doctor');
  } ,*/

   

  /*mostrar: (id) => {
    return api.get(`/personal/cita/${id}`);
  },

  modificar: (id, datos) => {
    return api.patch(`/personal/cita/${id}`, datos);
  },

  eliminar: (id) => {
    return api.delete(`/personal/cita/${id}`);
  }, */
};

export default historiaService;
