import api from "./api";

const ciataService = {
    listar: (id) => {
        return api.get(`personal/cita/personalAd/${id}`)
    },

    guardar: (datos) => {
        return api.post("/personal/paciente", datos)
    },
    
    mostrar: (id) => {
        return api.get(`/personal/paciente/${id}`)
    },

    modificar: (id, datos) => {
        return api.patch(`/personal/paciente/${id}`, datos)
    },

    eliminar: (id) => {
        return api.delete(`/personal/paciente/${id}`)
    }
}

export default ciataService;