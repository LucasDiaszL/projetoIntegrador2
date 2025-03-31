import React from "react";
import { Carousel } from "flowbite-react";

const Home2 = () => {
  return (
    <div className="bg-[var(--color-neutralSilver)]">
      <div className="px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen ">
        
          <Carousel>
            <div className="flex h-full items-center justify-center">
              Slide 1
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
