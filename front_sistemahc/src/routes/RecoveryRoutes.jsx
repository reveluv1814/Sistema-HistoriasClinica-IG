import Recovery from "../views/Recovery";
import NavbarRecovery from "../layouts/pages/NavbarRecovery";
import FormChangePass from "../views/ChangePassword";

const SitioRoutes = {
  path: "/recovery",
  element: <NavbarRecovery />,
  children: [
    {
      path: "recovery-password",
      element: <Recovery />,
    },
    {
      path: "change-password",
      element: <FormChangePass />,
    },
  ],
};
export default SitioRoutes;
