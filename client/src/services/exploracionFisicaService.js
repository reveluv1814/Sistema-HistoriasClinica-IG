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
  editarBoca: (id, datos) => {
    return api.patch(`historia/exploracionF/boca/${id}`, datos);
  },
  guardarBoca: (id, datos) => {
    return api.post(`historia/exploracionF/boca/${id}`, datos);
  },
  editarCuello: (id, datos) => {
    return api.patch(`historia/exploracionF/cuello/${id}`, datos);
  },
  guardarCuello: (id, datos) => {
    return api.post(`historia/exploracionF/cuello/${id}`, datos);
  },
  editarTorax: (id, datos) => {
    return api.patch(`historia/exploracionF/torax/${id}`, datos);
  },
  guardarTorax: (id, datos) => {
    return api.post(`historia/exploracionF/torax/${id}`, datos);
  },
  editarColumna: (id, datos) => {
    return api.patch(`historia/exploracionF/columna/${id}`, datos);
  },
  guardarColumna: (id, datos) => {
    return api.post(`historia/exploracionF/columna/${id}`, datos);
  },
  editarAbdomen: (id, datos) => {
    return api.patch(`historia/exploracionF/abdomen/${id}`, datos);
  },
  guardarAbdomen: (id, datos) => {
    return api.post(`historia/exploracionF/abdomen/${id}`, datos);
  },
  editarMiembros: (id, datos) => {
    return api.patch(`historia/exploracionF/miembros/${id}`, datos);
  },
  guardarMiembros: (id, datos) => {
    return api.post(`historia/exploracionF/miembros/${id}`, datos);
  },
  editarGenitalesEx: (id, datos) => {
    return api.patch(`historia/exploracionF/genitalesEx/${id}`, datos);
  },
  guardarGenitalesEx: (id, datos) => {
    return api.post(`historia/exploracionF/genitalesEx/${id}`, datos);
  },
  editarTejidoSub: (id, datos) => {
    return api.patch(`historia/exploracionF/tejidoSub/${id}`, datos);
  },
  guardarTejidoSub: (id, datos) => {
    return api.post(`historia/exploracionF/tejidoSub/${id}`, datos);
  },
  editarMusculatura: (id, datos) => {
    return api.patch(`historia/exploracionF/musculatura/${id}`, datos);
  },
  guardarMusculatura: (id, datos) => {
    return api.post(`historia/exploracionF/musculatura/${id}`, datos);
  },
  editarPielAnexos: (id, datos) => {
    return api.patch(`historia/exploracionF/pielAnexos/${id}`, datos);
  },
  guardarPielAnexos: (id, datos) => {
    return api.post(`historia/exploracionF/pielAnexos/${id}`, datos);
  },
  editarExNeurologico: (id, datos) => {
    return api.patch(`historia/exploracionF/exNeurologico/${id}`, datos);
  },
  guardarExNeurologico: (id, datos) => {
    return api.post(`historia/exploracionF/exNeurologico/${id}`, datos);
  },
};

export default exploracionFisicaService;
