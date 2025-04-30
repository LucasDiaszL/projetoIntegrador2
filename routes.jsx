import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro2";
import Home2 from "./pages/home";
import Servico from "./pages/Servico";
import About from "./pages/About"

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/service" element={<Servico />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
