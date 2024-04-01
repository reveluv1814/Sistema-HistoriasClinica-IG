import { useRoutes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";
import NotFound from "./../views/NotFound";
import SitioRoutes from "./SitioRoutes";
import AdminRoutes from "./AdminRoutes";
import PersonalRoutes from "./PersonalRoutes";
import DoctorRoutes from "./DoctorRoutes";
import LaboratoristaRoutes from "./LaboratoristaRoutes";
import RecoveryRoutes from "./RecoveryRoutes";
import NotFoundRoutes from "./NotFoundRoutes";

const ThemeRoutes = () => {
  const user = !!localStorage.getItem("access_token");
  const admin = localStorage.getItem("rol") === "admin";
  const personal = localStorage.getItem("rol") === "personalAdmin";
  const doctor = localStorage.getItem("rol") === "doctor";
  const laboratorista = localStorage.getItem("rol") === "laboratorista";
  return useRoutes([
    SitioRoutes,
    RecoveryRoutes,
    NotFoundRoutes,
    {
      element: <ProtectedRoute isAllowed={user && admin} />,
      children: [AdminRoutes],
    },
    {
      element: <ProtectedRoute isAllowed={user && (admin || personal)} />,
      children: [PersonalRoutes],
    },
    {
      element: <ProtectedRoute isAllowed={user && (admin || doctor)} />,
      children: [DoctorRoutes],
    },
    {
      element: <ProtectedRoute isAllowed={user && (admin || laboratorista)} />,
      children: [LaboratoristaRoutes],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
export default ThemeRoutes;
