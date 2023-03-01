import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import RecoveryPage from "./Pages/RecoveryPage";
import Admin from "./Pages/AdminPage";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/Protected";
import { UserContext } from "./context/UserContext";
import { useEffect,useState } from "react";

function App() {
  const [rol, setrol] = useState({rol:null})
  useEffect(() => {
    console.log(rol);
  
  }, [rol])
  
  const  value  = "useContext(UserContext);"
  console.log(value)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage state={setrol} />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route element={<ProtectedRoute isAllowed={!!rol.rol && rol.rol=== "admin"} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
