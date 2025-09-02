// src/components/Navbar.jsx (or wherever you prefer to place it)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from "../assets/logo.png";
import useAuthStatus from '../hooks/useAuthStatus'; // <-- Import the custom hook

const Navbar = () => {
  const phoneNumber = "9253625099";
  const { isLoggedIn, logout } = useAuthStatus(); // <-- Use the hook
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      className="p-4 bg-gradient-to-r from-green-700 to-green-900 shadow-lg text-white"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors duration-300">
          <img
            src={logo}
            alt="ScrapShera Logo"
            className="w-10 h-10 rounded-full"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/CCCCCC/000000?text=Logo"; }}
          />
          <span className="text-xl font-bold">ScrapShera</span>
        </Link>
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden ml-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/scrap-rates" className="px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
            Scrap Rates
          </Link>
          <a
            href={`tel:${phoneNumber}`}
            className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300"
          >
            Call Us
          </a>
          {/* Auth links */}
          {!isLoggedIn ? (
            <>
                <Link to="/login" className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300">
                  Signup
                </Link>
            </>
          ) : (
            <>
                <Link to={user && user.role === 'admin' ? "/dashboard/admin" : "/dashboard/user"} className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300"
                >
                  Logout
                </button>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 animate-slideInDown">
          <Link to="/" className="px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/scrap-rates" className="px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            Scrap Rates
          </Link>
          <a
            href={`tel:${phoneNumber}`}
            className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Call Us
          </a>
          {!isLoggedIn ? (
            <>
                <Link to="/login" className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300" onClick={() => setMenuOpen(false)}>
                  Signup
                </Link>
            </>
          ) : (
            <>
                <Link to={user && user.role === 'admin' ? "/dashboard/admin" : "/dashboard/user"} className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-300"
                >
                  Logout
                </button>
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
