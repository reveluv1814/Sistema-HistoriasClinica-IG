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
  editarOrejas: (id, datos) => {
    return api.patch(`historia/exploracionF/orejas/${id}`, datos);
  },
  guardarOrejas: (id, datos) => {
    return api.post(`historia/exploracionF/orejas/${id}`, datos);
  },
  editarOjos: (id, datos) => {
    return api.patch(`historia/exploracionF/ojos/${id}`, datos);
  },
  guardarOjos: (id, datos) => {
    return api.post(`historia/exploracionF/ojos/${id}`, datos);
  },
  editarNariz: (id, datos) => {
    return api.patch(`historia/exploracionF/nariz/${id}`, datos);
  },
  guardarNariz: (id, datos) => {
    return api.post(`historia/exploracionF/nariz/${id}`, datos);
  },
  editarMaxMandibula: (id, datos) => {
    return api.patch(`historia/exploracionF/maxMandibula/${id}`, datos);
  },
  guardarMaxMandibula: (id, datos) => {
    return api.post(`historia/exploracionF/maxMandibula/${id}`, datos);
  },
};

export default exploracionFisicaService;
