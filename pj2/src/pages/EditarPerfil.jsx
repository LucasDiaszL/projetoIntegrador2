import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    endereco: "",
    telefone: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const removeMascaraTelefone = (telefone) => {
    return telefone.replace(/\D/g, ""); // Remove tudo que não for número
  };
  
  // Função salva apenas em localStorage, atualizar futuramente para alterar no banco de dados
  const handleSave = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Usuário não identificado.");
      return;
    }

    const telefoneSemMascara = removeMascaraTelefone(formData.telefone);

    const { error } = await supabase
      .from("clientes") // substitua pelo nome real da tabela
      .update({
        nome: formData.nome,
        endereco: formData.endereco,
        telefone: telefoneSemMascara
      })
      .eq("id", user.id);

    if (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar o perfil. Tente novamente.");
    } else {
      const novoUser = { ...user, ...formData, telefone: telefoneSemMascara };
      localStorage.setItem("user", JSON.stringify(novoUser));
      alert("Perfil atualizado com sucesso!");
      navigate("/perfil");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#EFEEF9] py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Edição de Perfil</h2>
          <p className="text-gray-700 mb-6 text-center">
            Edite suas informações pessoais abaixo. Após concluir, clique em "Salvar" para atualizar seu perfil.
          </p>

          {user && (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  maxLength="15"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all"
              >
                Salvar
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEdit;
