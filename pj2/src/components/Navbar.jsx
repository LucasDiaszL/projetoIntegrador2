import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/caixa-de-ferramentas.png";
import DefaultUserImage from "../assets/default-user.png";
import { FaXmark, FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Alternar o menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Verifica se o usuário está logado ao montar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Lógica da sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "Service", path: "/service" },
    { link: "About", path: "/about" },
    { link: "Hire", path: "/hire" },
    { link: "Subscribe", path: "/subscribe" },
    { link: "FAQ", path: "/faq" },
  ];

  return (
    <header className="w-full bg-white md:bg-transparent top-0 left-0 right-0">
      <nav
        className={`py-4 lg:px-14 px-4 ${isSticky
          ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
          : ""
          }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={Logo}
              alt="Logo"
              className="w-10 inline-block items-center"
            />
            <span className="text-[#263238]">ServiGo</span>
          </a>

          {/* Navegação desktop */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                key={path}
                className="block text-base text-gray-900 hover:text-[var(--color-primary)] first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Botões desktop */}
          <div className="space-x-4 hidden lg:flex items-center">
            {!user && (
              <>
                <a
                  href="/Login"
                  className="text-[var(--color-primary)] hover:text-[var(--color-third)]"
                >
                  Login
                </a>
                <button
                  onClick={() => navigate("/cadastro")}
                  className="bg-[var(--color-primary)] text-white py-2 px-4 transition-all duration-300 rounded cursor-pointer hover:bg-neutral-500"
                >
                  Sign up
                </button>
              </>
            )}

            {user && (
              <>
                <img
                  src={user.avatar ? user.avatar : DefaultUserImage}
                  alt="Perfil do usuário"
                  onClick={() => navigate("/perfil")}
                  className="w-13 h-13 rounded-full object-cover cursor-pointer border-2 border-[var(--color-primary)] hover:opacity-80 transition"
                />

                {/* Botão visível apenas para prestadores */}
                {user?.tipo_usuario === "prestador" && (
                  <button
                    onClick={() => navigate("/cadastroServico")}
                    title="Cadastrar Novo Serviço"
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                  >
                    <svg
                      className="stroke-teal-500 fill-none group-hover:fill-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                      viewBox="0 0 24 24"
                      height="40px"
                      width="40px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z" />
                      <path strokeWidth="1.5" d="M12 8v8m-4-4h8" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[var(--color-neutralDgray)] focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navegação mobile */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-[var(--color-primary)] ${isMenuOpen ? "block fixed top-0 right-0 left-0 z-50" : "hidden"
            }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              key={path}
              className="block text-base text-white hover:text-[var(--color-third)] first:font-medium"
            >
              {link}
            </Link>
          ))}

          {!user && (
            <>
              <Link
                to="/login"
                className="block text-white hover:text-[var(--color-third)]"
              >
                Login
              </Link>
              <Link
                to="/cadastro"
                className="block text-white hover:text-[var(--color-third)]"
              >
                Sign up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/perfil"
                className="block text-white hover:text-[var(--color-third)]"
              >
                Perfil
              </Link>

              {/* Botão no menu mobile para prestadores */}
              {user?.tipo_usuario === "prestador" && (
                <Link
                  to="/cadastrar-servico"
                  className="block text-white hover:text-[var(--color-third)]"
                >
                  Cadastrar Serviço
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
