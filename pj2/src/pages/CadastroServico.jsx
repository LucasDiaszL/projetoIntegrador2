import React, { useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CadastrarServico = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("Meio período");
  const [mensagem, setMensagem] = useState("");

  const handleCadastrar = async () => {
    if (!nome || !descricao || !categoria || !tipo) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase.from("servicos").insert([
      {
        nome,
        descricao,
        categoria,
        tipo, // novo campo aqui
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Erro ao cadastrar serviço:", error);
      setMensagem("Erro ao cadastrar serviço.");
    } else {
      setMensagem("Serviço cadastrado com sucesso!");
      setNome("");
      setDescricao("");
      setCategoria("");
      setTipo("Meio período");
    }
  };

  return (
  <>
    <Navbar/>
    
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cadastrar Serviço</h2>

      <label className="block mb-2">Nome do Serviço</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2">Descrição</label>
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2">Categoria</label>
      <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2">Tipo de Serviço</label>
      <div className="flex gap-4 mb-4">
        {["Meio período", "Tempo integral", "Contrato"].map((op) => (
          <label key={op}>
            <input
              type="radio"
              name="tipo"
              value={op}
              checked={tipo === op}
              onChange={(e) => setTipo(e.target.value)}
              className="mr-1"
            />
            {op}
          </label>
        ))}
      </div>

      <button
        onClick={handleCadastrar}
        className="w-full bg-[var(--color-primary)] text-white p-2 rounded hover:bg-blue-700"
      >
        Cadastrar
      </button>

      {mensagem && <p className="mt-4 text-center">{mensagem}</p>}
    </div>
    <Footer></Footer>
    </>
  );
};

export default CadastrarServico;
