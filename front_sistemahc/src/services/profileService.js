import api from "./api";

const profileService = {
  mostrar: (id) => {
    return api.get(`/admin/profile/${id}`);
  },
};

export default profileService;
