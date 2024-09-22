import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <ul>
          <li>
            <Link className="navbar-link text-white hover:text-gray-200" to="/">Home</Link>
          </li>
          <li>
            <Link className="navbar-link text-white hover:text-gray-200" to="/">Categorias</Link>
          </li>
          <li>
            <Link className="navbar-link text-white hover:text-gray-200" to="/">Receitas</Link>
          </li>
          <li>
            <Link className="navbar-link text-white hover:text-gray-200" to="/">Contato</Link>
          </li>
        </ul>

    </nav>
  );
};

export default Navbar;
