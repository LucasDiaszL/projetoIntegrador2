import React from "react";
import { Carousel } from "flowbite-react";
import banner1 from "../assets/Banner2.png";

const Home2 = () => {
  return (
    <div className="bg-[var(--color-neutralSilver)]">
      <div className="px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen ">
        <Carousel className="w-full mx-auto ">
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img src={banner1} alt=""></img>
            </div>
            {/* Texto*/ }
            
          </div>
          <div className="flex h-full items-center justify-center ">
            Slide 2
          </div>
          <div className="flex h-full items-center justify-center ">
            Slide 3
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home2;
