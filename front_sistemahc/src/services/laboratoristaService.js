import api from "./api";

const laboratoristaService = {
    listar: (q="", page, limit) => {
        return api.get(`/admin/laboratorista?q=${q}&page=${page}&limit=${limit}`)
    },

    guardar: (datos) => {
        return api.post("/admin/laboratorista", datos)
    },
    
    mostrar: (id) => {
        return api.get(`/admin/laboratorista/${id}`)
    },

    modificar: (id, datos) => {
        return api.put(`/admin/laboratorista/${id}`, datos)
    },

    eliminar: (id) => {
        return api.delete(`/admin/laboratorista/${id}`)
    }
}

export default laboratoristaService;