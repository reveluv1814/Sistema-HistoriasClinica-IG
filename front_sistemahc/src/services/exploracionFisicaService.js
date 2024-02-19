import api from "./api";

const exploracionFisicaService = {
  apartadosExploracionF: (id) => {
    return api.get(`historia/exploracionF/${id}`);
  },
  editarExploracionF: (id, datos) => {
    return api.patch(`historia/exploracionF/${id}`, datos);
  },
  guardarExploracionF: (id, datos) => {
    return api.post(`historia/exploracionF/${id}`, datos);
  },
  editarCraneoF: (id, datos) => {
    return api.patch(`historia/exploracionF/craneoF/${id}`, datos);
  },
  guardarCraneoF: (id, datos) => {
    return api.post(`historia/exploracionF/craneoF/${id}`, datos);
  },
};

export default exploracionFisicaService;
