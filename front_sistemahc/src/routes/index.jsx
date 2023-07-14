import { useRoutes } from "react-router-dom";
import SitioRoutes from "./SitioRoutes";
import AdminRoutes from "./AdminRoutes";
import RecoveryRoutes from './RecoveryRoutes'

const ThemeRoutes = () => {
  return useRoutes([SitioRoutes,AdminRoutes,RecoveryRoutes]);
};
export default ThemeRoutes;
