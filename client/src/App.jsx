import Routes from "./routes";
import "./layouts/css/style.css";
import "./layouts/charts/ChartjsConfig";
import UserProfileProvider from "./context/UserProfileContext";

function App() {
  return (
    <>
      <UserProfileProvider>
        <Routes />
      </UserProfileProvider>
    </>
  );
}

export default App;
