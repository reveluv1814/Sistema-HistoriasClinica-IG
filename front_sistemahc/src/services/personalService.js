import api from "./api";

const personalService = {
    listar: (q="", page, limit) => {
        return api.get(`/admin/personalAd?q=${q}&page=${page}&limit=${limit}`)
    },

    guardar: (datos) => {
        return api.post("/admin/personalAd", datos)
    },
    
    mostrar: (id) => {
        return api.get(`/admin/personalAd/${id}`)
    },

    modificar: (id, datos) => {
        return api.put(`/admin/personalAd/${id}`, datos)
    },

    eliminar: (id) => {
        return api.delete(`/admin/personalAd/${id}`)
    }
}

export default personalService;