import DoctorLayout from "../layouts/DoctorLayout";
import Paciente from "../views/doctor/PacienteVista";
import Citas from "../views/doctor/Citas";
import Historia from "../views/HistoriaComponents/Historia";
import HistoriaForm from "../views/HistoriaComponents/HistoriaForms/HistoriaForm";

const DoctorRoutes = {
  path: "/doctor",
  element: <DoctorLayout />,
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
      path: "historia/:id",
      element: <Historia atras={"/doctor/pacientes"}/>,
    },
    {
      path: "historia/:historiaId/consulta/:consultaId",
      element: <HistoriaForm />,
    },
  ], 
};

export default DoctorRoutes;
