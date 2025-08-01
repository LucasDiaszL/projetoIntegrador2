import React, { Component } from "react";

// Import icones
import { BsTools, BsLaptop, BsGraphUpArrow, BsBricks, BsFileEarmarkText, BsTruck, BsHeartPulse } from "react-icons/bs";
import {GiGlock} from "react-icons/gi";



const Services = () => {
  return (
    <div className="md:px-14 px-14 py-16 max-w-screen-2x1 mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl text-[var(--color-neutralDgray)] font-semibold mb-2 ">Serviços</h2>
        <p className="text-neutralDgray">Solução rápida e confiável: mais de 1000 prestadores disponíveis!</p>
        {/* {services} */}
        <div className="my-12 flex flex-wrap justify-between items-center gap-8">

          <img src="/src/assets/icones/icone1.png" alt=""></img>
          <img src="/src/assets/icones/icone2.png" alt=""></img>
          <img src="/src/assets/icones/icone3.png" alt=""></img>
          <img src="/src/assets/icones/icone4.png" alt=""></img>
          <img src="/src/assets/icones/icone5.png" alt=""></img>
          <img src="/src/assets/icones/icone6.png" alt=""></img>
          <img src="/src/assets/icones/icone7.png" alt=""></img>


        </div>
        <div>
          <h2 className="text-4xl text-[var(--color-neutralDgray)] font-semibold mb-2">
            Sugestão ícones de serviços em vez de PNG
          </h2>
        </div>

        <div className="my-12 flex flex-wrap lg:justify-between justify-center items-start w-full text-gray-700 gap-8">
          <div className="flex flex-col items-center min-w-[100px]">
            <BsTools className="text-5xl mb-2" aria-label="Manutenção" />
            <span className="text-sm font-medium">Manutenção</span>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <BsLaptop className="text-5xl mb-2" aria-label="Suporte TI" />
            <span className="text-sm font-medium">Suporte TI</span>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <BsGraphUpArrow className="text-5xl mb-2" aria-label="Financeiro" />
            <span className="text-sm font-medium">Financeiro</span>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <BsBricks className="text-5xl mb-2" aria-label="Construção" />
            <span className="text-sm font-medium">Construção</span>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <BsFileEarmarkText className="text-5xl mb-2" aria-label="Jurídico" />
            <span className="text-sm font-medium">Jurídico</span>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <BsTruck className="text-5xl mb-2" aria-label="Frete" />
            <span className="text-sm font-medium">Frete</span>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <BsHeartPulse className="text-5xl mb-2" aria-label="Saúde" />
            <span className="text-sm font-medium">Saúde</span>
          </div>
          <div className="flex flex-col items-center min-w-[100px]">
            <GiGlock className="text-5xl mb-2" aria-label="Saúde" />
            <span className="text-sm font-medium">Sumiço</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
