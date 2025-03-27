import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //Função define alternancia entre o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }



  useEffect(() => {
    const handleScroll = () => {
      if (Window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  });


  const navItems = [
    {link: "Home", path: "home"},
    {link: "Service", path: "service"},
    {link: "About", path: "about"},
    {link: "Hire", path: "hire"},
    {link: "Subscribe", path: "Subscribe"},
    {link: "FAQ", path: "faq"},

  ];
  

  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
        <nav>
            <div>
                <a href=""></a>

            </div>
        </nav>
    </header>
  );
};

export default Navbar;
