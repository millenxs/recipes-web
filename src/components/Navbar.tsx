import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Referência para o menu
  const burgerRef = useRef<HTMLButtonElement>(null); // Referência para o botão de hamburguer

  // Alterna o menu ao clicar no botão
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique foi fora do menu e do botão de hamburguer
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Fecha o menu
      }
    };

    // Adiciona o listener para cliques fora
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Remove o listener ao desmontar
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Fecha o menu ao clicar em um link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Botão para abrir/fechar o menu em telas menores */}
      <button
        onClick={toggleMenu}
        ref={burgerRef} // Define a referência para o botão de hamburguer
        className="burger cursor-pointer lg:hidden block"
      >
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 20 20"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      {/* Menu de links */}
      <div
        ref={menuRef} // Define a referência para o menu
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:w-auto w-full`}
        id="menu"
      >
        <nav>
          <ul
            className={`text-xl ${
              isOpen
                ? "nav-open flex flex-col items-center bg-[#be8040] w-3/4 ml-2"
                : "hidden lg:flex"
            } rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {/* Links que fecham o menu ao serem clicados */}
            <li>
              <Link
                onClick={closeMenu} // Fecha o menu ao clicar no link
                className="navbar-link text-white hover:text-gray-200"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu} // Fecha o menu ao clicar no link
                className="navbar-link text-white hover:text-gray-200"
                to="/categorias"
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu} // Fecha o menu ao clicar no link
                className="navbar-link text-white hover:text-gray-200"
                to="/contato"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
