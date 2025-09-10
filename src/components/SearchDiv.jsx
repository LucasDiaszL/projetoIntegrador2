import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";

const SearchDiv = ({
  valueServico,
  onChangeServico,
  onClearServico,
  onClearAll, // (opcional) nova prop para limpar todos os filtros
}) => {
  return (
    <div className="searchDiv grid gap-10 bg-[var(--color-neutralSilver)] rounded-[10px] p-[3rem]">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="firstDiv flex flex-col sm:flex-row justify-between items-center rounded-[8px] gap-4 bg-white p-5 shadow-lg shadow-greyIsh-700">
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

          <button
            type="submit"
            className="bg-[var(--color-primary)] p-3 px-6 rounded-[10px] text-white cursor-pointer hover:bg-neutral-500"
          >
            Pesquisar
          </button>
        </div>
      </form>

      {/* FILTROS */}
      <div className="secDiv flex flex-wrap items-center gap-5 justify-center">
        {/* Relevância */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="relevance" className="text-[#808080] font-semibold">
            Relevância:
          </label>
          <select
            name="relevance"
            id="relevance"
            className="bg-white rounded-[3px] px-4 py-1"
          >
            <option value="relevancia">Relevância</option>
            <option value="mais-vendidos">Mais vendidos</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="novidades">Novidades</option>
            <option value="melhor-avaliados">Melhor avaliados</option>
          </select>
        </div>

        {/* Tipo */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="tipo" className="text-[#808080] font-semibold">
            Tipo:
          </label>
          <select
            name="tipo"
            id="tipo"
            className="bg-white rounded-[3px] px-4 py-1"
          >
            <option value="todos">Todos</option>
            <option value="servico">Serviço</option>
            <option value="produto">Produto</option>
            <option value="plano">Plano</option>
            <option value="consulta">Consulta</option>
          </select>
        </div>

        {/* Nível */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="nivel" className="text-[#808080] font-semibold">
            Nível:
          </label>
          <select
            name="nivel"
            id="nivel"
            className="bg-white rounded-[3px] px-4 py-1"
          >
            <option value="todos">Todos</option>
            <option value="basico">Básico</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>

        {/* Botão limpar filtros */}
        <span
          className="text-[#a1a1a1] cursor-pointer hover:text-[var(--color-primary)]"
          onClick={onClearAll}
        >
          Limpar tudo
        </span>
      </div>
    </div>
  );
};

export default SearchDiv;