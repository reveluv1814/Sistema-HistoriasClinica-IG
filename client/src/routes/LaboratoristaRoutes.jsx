import LaboratoristaLayout from "../layouts/LaboratoristaLayout";
import Paciente from "../views/laboratorista/Pacientes";
import Historia from "../views/HistoriaComponents/Historia";
import Laboratorio from '../views/laboratorista/Laboratorio'

const DoctorRoutes = {
  path: "/laboratorista",
  element: <LaboratoristaLayout />,
  children: [
    {
      path: "pacientes",
      element: <Paciente />,
    },
    {
      path: "laboratorio/:id",
      element: <Laboratorio />,
    },
    {
      path: "historia/:id",
      element: <Historia atras={"/laboratorista/pacientes"} />,
    },
  ],
};

export default DoctorRoutes;
