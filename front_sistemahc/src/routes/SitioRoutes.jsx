import Login from "../views/Login";
import Recovery from "../views/Recovery";

const SitioRoutes = {
  path: "/",
  element: <Login />,
  /* children: [
    {
      path: "/recovery",
      element: <Recovery />,
    }, */
  /* {
      path: "/change-password",
      element: <Login />,
    }, 
  ],*/
};
export default SitioRoutes;
