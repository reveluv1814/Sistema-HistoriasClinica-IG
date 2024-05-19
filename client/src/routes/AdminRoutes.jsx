import AdminLayout from "../layouts/AdminLayout";
import Laboratorista from "../views/admin/Laboratorista";
import Doctor from "../views/admin/Doctores";
import Personal from "../views/admin/Personal";

//Doctor
import Paciente from "../views/doctor/PacienteVista";
import Citas from "../views/doctor/Citas";
import Historia from "../views/HistoriaComponents/Historia";
import HistoriaForm from "../views/HistoriaComponents/HistoriaForms/HistoriaForm";

//Laboratorista
import PacienteLabo from "../views/laboratorista/Pacientes";
import HistoriaLabo from "../views/HistoriaComponents/Historia";
import LaboratorioLabo from "../views/laboratorista/Laboratorio";

//PersonalAd
import PacientePersonal from "../views/personal/Paciente";
import CitasPersonal from "../views/personal/Citas";
import AddCitaPersonal from "../views/personal/AddCita";
import EditCitaPersonal from "../views/personal/EditCita";
import HistoriaPersonal from "../views/HistoriaComponents/Historia";
import AdminList from "../views/admin/AdminList";

const AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "adminList",
      element: <AdminList />,
    },
    {
      path: "doctores",
      element: <Doctor />,
    },
    {
      path: "laboratoristas",
      element: <Laboratorista />,
    },
    {
      path: "personal-administrativo",
      element: <Personal />,
    },
    {
      path: "doctor",
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
          element: <Historia atras={"/admin/doctor/pacientes"} />,
        },
        {
          path: "historia/:historiaId/consulta/:consultaId",
          element: <HistoriaForm />,
        },
      ],
    },
    {
      path: "laboratorista",
      children: [
        {
          path: "pacientes",
          element: <PacienteLabo />,
        },
        {
          path: "laboratorio/:id",
          element: <LaboratorioLabo />,
        },
        {
          path: "historia/:id",
          element: <HistoriaLabo atras={"/admin/laboratorista/pacientes"} />,
        },
      ],
    },
    {
      path: "personal",
      children: [
        {
          path: "pacientes",
          element: <PacientePersonal />,
        },
        {
          path: "citas",
          element: <CitasPersonal />,
        },
        {
          path: "addCita/:id",
          element: <AddCitaPersonal />,
        },
        {
          path: "editCita/:id",
          element: <EditCitaPersonal />,
        },
        {
          path: "historia/:id",
          element: <HistoriaPersonal atras={"/admin/personal/pacientes"} />,
        },
      ],
    },
  ],
};

export default AdminRoutes;
