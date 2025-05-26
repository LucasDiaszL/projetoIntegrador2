import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Butao from "../components/Butao";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div
        ref={containerRef}
        className="min-h-[60vh] mb-20 flex flex-col justify-center items-center bg-[#EFEEF9] py-10 relative"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Perfil</h2>

          <p className="text-gray-700 mb-6 text-center">
            Bem-vindo ao seu perfil! Aqui você pode ver suas informações e gerenciar sua conta.
          </p>

          {user && (
            <div className="mb-6 space-y-2 text-sm text-gray-800">
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>CPF:</strong> {user.cpf}</p>
              <p><strong>Endereço:</strong> {user.endereco}</p>
              <p><strong>Telefone:</strong> {user.telefone}</p>
            </div>
          )}

          <div className="flex left-0 justify-center mb-4">
            <button
              onClick={() => navigate("/editarperfil")}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all"
            >
              Editar Perfil
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-all"
            >
              Sair
            </button>
          </div>
        </div>
        <Butao containerRef={containerRef} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
