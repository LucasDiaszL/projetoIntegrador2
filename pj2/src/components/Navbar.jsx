import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/caixa-de-ferramentas.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //Função define alternancia entre o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    { link: "Home", path: "home" },
    { link: "Service", path: "service" },
    { link: "About", path: "about" },
    { link: "Hire", path: "hire" },
    { link: "Subscribe", path: "Subscribe" },
    { link: "FAQ", path: "faq" },
  ];

  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
      <nav>
        <div>
          <a
            href=""
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={Logo}
              alt=""
              className="w-10 inline-block items-center "
            ></img>
            <span className="text-[#263238]">ServiGo</span>
          </a>

          {/*itens de navegação para dispositivos grandes*/}

          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="block text-base  text-gray-900 hover:text-[var(--color-primary)]  first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* btn para dispostivos grandes*/}

          <div className="space-x-12 hidden lg:flex items-center">
            <a
              href="/"
              className="hidden lg:flex items-center text-[var(--color-primary)] hover:text-[var(--color-third)]"
            >
              Login
            </a>
            <button className="bg-[var(--color-primary)] text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutral-500">
              Sing up
            </button>
          </div>

          {/*botão do menu para dispostiveis moveis*/}
          <div className="md:hidden ">
            <button></button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
