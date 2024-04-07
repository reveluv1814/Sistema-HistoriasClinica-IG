import api from "./api";

const adminService = {
  rolesAdmin: (id) => {
    return api.get(`/admin/rol/${id}`);
  },
};

export default adminService;
