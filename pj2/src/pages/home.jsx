import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login"); // Redireciona para a página de login
  }, [navigate]);

  return null; // Não renderiza nada, só redireciona
}

export default Home;
