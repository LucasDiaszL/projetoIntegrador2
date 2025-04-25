import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro2";
import Home2 from "./pages/home";
import Servico from "./pages/Servico";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/service" element={<Servico />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
