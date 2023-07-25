import AdminLayout from "../layouts/AdminLayout";
import Laboratorista from "../views/admin/Laboratorista";
import Doctor from "../views/admin/Doctores";
import Personal from "../views/admin/Personal";
const AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "doctores",
      element: <Doctor />,
    },
    {
      path: "laboratoristas",
      element: <Laboratorista />,
    },{
      path: "personal-administrativo",
      element: <Personal />,
    },
  ],
};
/* 
const AdminRoutes = (
  <Route path="/admin" element={<SitioLayout />}>
    <Route path="doctores" element={<Doctor />} />
    
  </Route>
); */


export default AdminRoutes;
