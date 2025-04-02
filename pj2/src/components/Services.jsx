import React, { Component } from "react";


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
      </div>
    </div>
  );
};

export default Services;
