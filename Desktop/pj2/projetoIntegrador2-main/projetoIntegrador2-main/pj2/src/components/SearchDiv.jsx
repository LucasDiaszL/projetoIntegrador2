import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SearchDiv = () => {
  return (
    <div className="searchDiv grid gp-10 bg-[var(--color-neutralSilver)] rounded-[10px] p-[3rem] ">
      <form action="">
        <div
          className="firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 
        shadow-lg shadow-greyIsh-700 "
        >
          <div className="flex gap-2 items-center :">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-[var(--color-primary)] focus:outline-none w-[100%]"
              placeholder="Pesquise o servico"
            />
            <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-[var(--color-primary)] icon" />
          </div>
          <div className="flex gap-2 items-center :">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-[var(--color-primary)] focus:outline-none w-[100%]"
              placeholder="Pesquise o servico"
            />
            <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-[var(--color-primary)] icon" />
          </div>
          <div className="flex gap-2 items-center :">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              className="bg-transparent text-[var(--color-primary)] focus:outline-none w-[100%]"
              placeholder="Pesquise o servico"
            />
            <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-[var(--color-primary)] icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchDiv;
