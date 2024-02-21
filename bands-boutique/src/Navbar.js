// src/Navbar.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Shop from './Shop';

const Navbar = () => {
  return (
    <Router>
      <nav className="bg-white p-4 shadow-md fixed top-0 w-full z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-gray-700 font-bold text-xl">Bands Boutique</div>
          <div className="flex space-x-6"> {/* Increased spacing with space-x-6 */}
            <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-black">Shop</Link>
            <Link to="/login" className="text-gray-700 hover:text-black">Login</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Navbar;