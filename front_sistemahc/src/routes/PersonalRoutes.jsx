import PersonalLayout from "../layouts/PersonalAdminLayout";
import Paciente from "../views/personal/Paciente";
import Citas from "../views/personal/Citas";
import AddCita from "../views/personal/AddCita";
import EditCita from "../views/personal/EditCita";

const PersonalRoutes = {
  path: "/personal",
  element: <PersonalLayout />,
  children: [
    {
      path: "pacientes",
      element: <Paciente />,
    },
    {
      path: "citas",
      element: <Citas />,
    },
    {
      path: "addCita/:id",
      element: <AddCita />,
    },
    {
      path: "editCita/:id",
      element: <EditCita />,
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
