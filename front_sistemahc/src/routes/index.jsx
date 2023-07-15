import { useRoutes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";
import NotFound from "./../views/NotFound";
import SitioRoutes from "./SitioRoutes";
import AdminRoutes from "./AdminRoutes";
import RecoveryRoutes from "./RecoveryRoutes";
import NotFoundRoutes from "./NotFoundRoutes";

const ThemeRoutes = () => {
  const user = !!localStorage.getItem("access_token");
  const admin = localStorage.getItem("rol") === "admin";
  return useRoutes([
    SitioRoutes,
    RecoveryRoutes,
    NotFoundRoutes,
    {
      element: <ProtectedRoute isAllowed={user&&admin} />,
      children: [AdminRoutes],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
export default ThemeRoutes;
