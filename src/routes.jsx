import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro2";
import Home2 from "./pages/home";
import Servico from "./pages/Servico";
import About from "./pages/About";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import CadastroServico from "./pages/CadastroServico";
import FAQ from "./pages/Faq";
import Hire from "./pages/Hire";
import ChatWidget from "./components/BotaoAjuda";
import SupportPanel from "./components/painelSuporte";
import Termos from "./pages/TermsAndConditions";

function AppRoutes() {
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setChecking(false); return; }

      const { data: profile } = await supabase
        .from("profiles").select("role").eq("id", user.id).single();

      setRole(profile?.role ?? null);
      setChecking(false);
    })();
  }, []);

  if (checking) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/service" element={<Servico />} />
        <Route path="/about" element={<About />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editarperfil" element={<EditarPerfil />} />
        <Route path="/cadastroServico" element={<CadastroServico />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/hire" element={<Hire />} />
        <Route
          path="/suporte"
          element={role === "suporte" ? <SupportPanel /> : <div className="p-4">Acesso restrito</div>}
        />
        <Route path="/Termos" element={<Termos />} />
      </Routes>

      {/* Apenas clientes veem o widget flutuante */}
      {role === "cliente" && <ChatWidget />}
    </Router>
  );
}

export default AppRoutes;
