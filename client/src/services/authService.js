import api from "./api";

const authService = {
    loginConNode: (credenciales) => {
        return api.post("/auth/login", credenciales)
    },

    registroConNode: (datos) => {
        return api.post("/auth/registro", datos)
    },
    recovery: (datos) => {
        return api.post("/auth/recovery", datos)
    },
    changePass: (datos) => {
        return api.post("/auth/change-password", datos)
    }
}

export default authService;