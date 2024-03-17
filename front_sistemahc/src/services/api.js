import axios from "axios";

const url_base =
  import.meta.env.VITE_URL_BACK_SERVICE || "http://127.0.0.1:4000/";

const api = axios.create({
  baseURL: url_base,
  timeout: 30000,
  /*
        headers: {
            Accept: 'application/json',
            // Authorization: 'Bearer '
        }
        */
});

// configuracion de header (TOKEN JWT)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// capturar errores: 401 o 403
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/recovery/recovery-password" &&
        window.location.pathname !== "/recovery/change-password"
      ) {
        window.location.href = "/";
      }
    }
    if (error.response.status === 403) {
    }
    return Promise.reject(error);
  }
);

const apiService = {
  get: (url, params) => api.get(url, params),
  post: (url, params) => api.post(url, params),
  patch: (url, params) => api.patch(url, params),
  delete: (url, params) => api.delete(url, params),
};

export default apiService;
