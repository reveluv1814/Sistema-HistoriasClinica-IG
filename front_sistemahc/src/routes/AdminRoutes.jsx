import SitioLayout from "../layouts/SitioLayout";
import Doctor from "../views/admin/Doctores";
import { Route } from "react-router-dom";
const AdminRoutes = {
  path: "/admin",
  element: <SitioLayout />,
  children: [
    {
      path: "doctores",
      element: <Doctor />,
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
