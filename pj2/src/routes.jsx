import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro2";
import Navbar from "./components/Navbar";
import Home2 from "./components/home";

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Home2></Home2>
      
    </Router>
  );
}

export default AppRoutes;
