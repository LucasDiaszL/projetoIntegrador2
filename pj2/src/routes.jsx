import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro2";
import Navbar from "./components/Navbar";

function AppRoutes() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={< Home/>} />  {/* Login como página inicial */}
        <Route path="/Login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
