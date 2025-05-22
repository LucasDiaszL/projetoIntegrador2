import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';


import Navbar from "../components/Navbar";
import SearchDiv from "../components/SearchDiv";
import Footer from "../components/Footer";

// import dos icons
import { BiTimeFive } from "react-icons/bi";
// Definição do componente Servico
const Servico = () => {
  const [servicos, setServicos] = useState([]);


function formatarDataOuHora(dataISO) {
  if (!dataISO) return 'sem data';

  const dataUTC = new Date(dataISO);
  if (isNaN(dataUTC.getTime())) return 'data inválida';

  // Corrige fuso manualmente: UTC - 3
  const dataBrasilia = new Date(dataUTC.getTime() - 3 * 60 * 60 * 1000);

  const agora = new Date();
  const diffMs = agora - dataBrasilia;
  const diffHoras = diffMs / (1000 * 60 * 60);

  if (diffHoras < 24) {
    return dataBrasilia.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } else {
    return dataBrasilia.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}


  useEffect(() => {
    buscarServicos();
  }, []);

  async function buscarServicos() {
    const { data, error } = await supabase.from('servicos').select('*');
    if (!error) setServicos(data);
    else console.error('Erro ao buscar serviços:', error);
  }

  return (
    <>
      <Navbar />
      <SearchDiv />
      <div>
        <div className="jobContainer flex gap-10 justify-center flex-wrap items-center py-10">
          {servicos.map((servico) => (
            <div
              key={servico.id}
              className="group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-[var(--color-primary)] shadow-lg shadow-greyIsh-400/700 hover:shadow-lg"
            >
              <span className="flex justify-between items-center gap-4">
                <h1 className="text-[16px] font-semibold text-black group-hover:text-white">
                  {servico.nome}
                </h1>
                <span className="flex items-center text-[#ccc] gap-1">
                  <BiTimeFive />  {formatarDataOuHora(servico.created_at)}
                </span>
              </span>
              <h6 className="text-gray-600 group-hover:text-white">
                {servico.descricao}
              </h6>
              <p className="text-sm text-gray-500 group-hover:text-white mt-2">
                Categoria: {servico.categoria}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
 

export default Servico;