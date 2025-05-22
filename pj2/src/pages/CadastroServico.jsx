import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function CadastroServico() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [servicos, setServicos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    const { data, error } = await supabase.from('servicos').select('*');
    if (!error) setServicos(data);
  }

  async function cadastrar(e) {
    e.preventDefault();

    if (!nome || !descricao || !categoria) {
      alert('Preencha todos os campos!');
      return;
    }

    const { error } = await supabase
      .from('servicos')
      .insert({ nome, descricao, categoria });

    if (error) {
      alert('Erro ao cadastrar');
      console.error(error);
    } else {
      setNome('');
      setDescricao('');
      setCategoria('');
      // Redireciona e envia "state" para exibir mensagem de sucesso
      navigate('/service', { state: { sucesso: true } });
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Serviços</h1>

      <form onSubmit={cadastrar} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do serviço"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Descrição do serviço"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Categoria do serviço"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
