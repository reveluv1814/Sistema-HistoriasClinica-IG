import LaboratoristaLayout from "../layouts/LaboratoristaLayout";
import Paciente from "../views/laboratorista/Pacientes";
import Citas from "../views/doctor/Citas";
import Historia from "../views/HistoriaComponents/Historia";
import HistoriaForm from "../views/HistoriaComponents/HistoriaForms/HistoriaForm";

const DoctorRoutes = {
  path: "/laboratorista",
  element: <LaboratoristaLayout />,
  children: [
    {
      path: "pacientes",
      element: <Paciente />,
    },
    // {
    //   path: "citas",
    //   element: <Citas />,
    // },
    {
      path: "historia/:id",
      element: <Historia atras={"/laboratorista/pacientes"} />,
    },
    // {
    //   path: "historia/:historiaId/consulta/:consultaId",
    //   element: <HistoriaForm />,
    // },
  ],
};

export default DoctorRoutes;
