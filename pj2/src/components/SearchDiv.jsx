import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const SearchDiv = ({
  valueServico,
  onChangeServico,
  onClearServico,
  valueCompanhia,
  onChangeCompanhia,
  onClearCompanhia,
  valueLocalizacao,
  onChangeLocalizacao,
  onClearLocalizacao,
}) => {
  return (
    <div className="searchDiv grid gap-10 bg-[var(--color-neutralSilver)] rounded-[10px] p-[3rem] ">
      <form action="">
        <div className="firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-lg shadow-greyIsh-700 ">
          {/* SERVIÇO */}
          <div className="flex gap-2 items-center w-full">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              value={valueServico}
              onChange={onChangeServico}
              className="bg-transparent text-[var(--color-primary)] focus:outline-none w-full"
              placeholder="Pesquise o serviço"
            />
            {valueServico && (
              <AiOutlineCloseCircle
                onClick={onClearServico}
                className="text-[30px] text-[#a5a6a6] hover:text-[var(--color-primary)] icon cursor-pointer"
              />
            )}
          </div>

          {/* COMPANHIA */}
          <div className="flex gap-2 items-center w-full">
            <BsHouseDoor className="text-[25px] icon" />
            <input
              type="text"
              value={valueCompanhia}
              onChange={onChangeCompanhia}
              className="bg-transparent text-[var(--color-primary)] focus:outline-none w-full"
              placeholder="Pesquise a companhia ..."
            />
            {valueCompanhia && (
              <AiOutlineCloseCircle
                onClick={onClearCompanhia}
                className="text-[30px] text-[#a5a6a6] hover:text-[var(--color-primary)] icon cursor-pointer"
              />
            )}
          </div>

          {/* LOCALIZAÇÃO */}
          <div className="flex gap-2 items-center w-full">
            <CiLocationOn className="text-[25px] icon" />
            <input
              type="text"
              value={valueLocalizacao}
              onChange={onChangeLocalizacao}
              className="bg-transparent text-[var(--color-primary)] focus:outline-none w-full"
              placeholder="Pesquise a localização"
            />
            {valueLocalizacao && (
              <AiOutlineCloseCircle
                onClick={onClearLocalizacao}
                className="text-[30px] text-[#a5a6a6] hover:text-[var(--color-primary)] icon cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-[var(--color-primary)] h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-neutral-500"
          >
            Pesquisar
          </button>
        </div>
      </form>

      <div
        className="secDiv flex items-center gap-10 justify-center
      "
      >
        <div className="singleSearch flex items-center gap-2 ">
          <label htmlFor="relevance" className="text-[#808080] font-semibold">
            Relevancia:
          </label>

          <select
            name=""
            id="relevance"
            className="bg-white rounded-[3px] px-4 py-1 "
          >
            <option value="relevancia">Relevância</option>
            <option value="mais-vendidos">Mais vendidos</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="novidades">Novidades</option>
            <option value="melhor-avaliados">Melhor avaliados</option>
          </select>
        </div>

        <div className="singleSearch flex items-center gap-2 ">
          <label htmlFor="type" className="text-[#808080] font-semibold">
            Tipo:
          </label>

          <select
            name=""
            id="relevance"
            className="bg-white rounded-[3px] px-4 py-1 "
          >
            <option value="todos">Todos</option>
            <option value="servico">Serviço</option>
            <option value="produto">Produto</option>
            <option value="plano">Plano</option>
            <option value="consulta">Consulta</option>
          </select>
        </div>

        <div className="singleSearch flex items-center gap-2 ">
          <label htmlFor="level" className="text-[#808080] font-semibold">
            Nível
          </label>

          <select
            name=""
            id="relevance"
            className="bg-white rounded-[3px] px-4 py-1 "
          >
            <option value="todos">Todos</option>
            <option value="basico">Básico</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>

        <span className="text-[#a1a1a1] cursor-pointer">Clear all</span>
      </div>
    </div>
  );
};

export default SearchDiv;
