import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import RecoveryPage from "./Pages/RecoveryPage";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
