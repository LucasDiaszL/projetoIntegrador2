import React from "react";
import { Carousel } from "flowbite-react";
import banner1 from "../assets/Banner2.png";
import Navbar from "../components/Navbar";

const Home2 = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[var(--color-neutralSilver)]">
        <div className="px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen ">
          <Carousel className="w-full mx-auto ">
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={banner1} alt=""></img>
              </div>
              {/* Texto*/}
              <div className="md:w-1/2">
                <h1 className="text-5xl font-semibold mb-4 text-[var(--color-neutralDgray) md:w-3/4 leading-snug] ">
                  Facilitamos sua vida<br></br>
                  <span className="text-[var(--color-primary)]  leading-snug ">com serviços rápidos e eficientes.</span>
                </h1>
                <p className=" text-[var(--color-third)] text-base mb-8" >Reformas, tecnologia, consultoria e muito mais.</p><br></br>
                <button className="btn-primary">Register</button>
              </div>
            </div>
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={banner1} alt=""></img>
              </div>
              {/* Texto*/}
              <div className="md:w-1/2">
                <h1 className="text-5xl font-semibold mb-4 text-[var(--color-neutralDgray) md:w-3/4 leading-snug] ">
                  Facilitamos sua vida<br></br>
                  <span className="text-[var(--color-primary)]  leading-snug ">com serviços rápidos e eficientes.</span>
                </h1>
                <p className=" text-[var(--color-third)] text-base mb-8" >Reformas, tecnologia, consultoria e muito mais.</p><br></br>
                <button className="btn-primary">Register</button>
              </div>
            </div>
            <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={banner1} alt=""></img>
              </div>
              {/* Texto*/}
              <div className="md:w-1/2">
                <h1 className="text-5xl font-semibold mb-4 text-[var(--color-neutralDgray) md:w-3/4 leading-snug] ">
                  Facilitamos sua vida<br></br>
                  <span className="text-[var(--color-primary)]  leading-snug ">com serviços rápidos e eficientes.</span>
                </h1>
                <p className=" text-[var(--color-third)] text-base mb-8" >Reformas, tecnologia, consultoria e muito mais.</p><br></br>
                <button className="btn-primary">Register</button>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home2;
