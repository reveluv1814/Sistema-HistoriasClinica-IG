import PersonalLayout from "../layouts/PersonalAdminLayout";
import Paciente from "../views/personal/Paciente";
const PersonalRoutes = {
  path: "/personal",
  element: <PersonalLayout />,
  children: [
    {
      path: "pacientes",
      element: <Paciente />,
    },
    /* {
      path: "laboratoristas",
      element: <Laboratorista />,
    },{
      path: "personal-administrativo",
      element: <Personal />,
    },  */
  ],
};
/* 
const AdminRoutes = (
  <Route path="/admin" element={<SitioLayout />}>
    <Route path="doctores" element={<Doctor />} />
    
  </Route>
); */

export default PersonalRoutes;
