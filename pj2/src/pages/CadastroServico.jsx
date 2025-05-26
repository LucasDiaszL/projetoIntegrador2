import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CadastroServico() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("Part-time"); // novo estado
  const [servicos, setServicos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    const { data, error } = await supabase.from("servicos").select("*");
    if (!error) setServicos(data);
  }

  async function cadastrar(e) {
    e.preventDefault();

    if (!nome || !descricao || !categoria || !tipo) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("servicos")
      .insert({ nome, descricao, categoria, tipo });

    if (error) {
      alert("Erro ao cadastrar");
      console.error(error);
    } else {
      setNome("");
      setDescricao("");
      setCategoria("");
      setTipo("Part-time");
      navigate("/service", { state: { sucesso: true } });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-10 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6">Cadastrar Novo Serviço</h1>

          <form onSubmit={cadastrar} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome do serviço
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Tipo de serviço */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Serviço
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Meio período", value: "Meio período" },
                  { label: "Tempo integral", value: "Tempo integral" },
                  { label: "Estágio", value: "Estágio" },
                  { label: "Contrato", value: "Contrato" },
                ].map((opcao) => (
                  <label
                    key={opcao.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      value={opcao.value}
                      checked={tipo === opcao.value}
                      onChange={() => setTipo(opcao.value)}
                      className="text-orange-500"
                    />
                    <span className="text-gray-700">{opcao.label}</span>
                  </label>
                ))}
                
              </div>
            </div>

            {/* Botão */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-[var(--color-primary)] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition"
              >
                Publicar Serviço
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
