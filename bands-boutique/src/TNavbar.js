// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Only import necessary components

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-gray-700 font-bold text-xl">Bands Boutique</div>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-black">Shop</Link>
          <Link to="/login" className="text-gray-700 hover:text-black">Login</Link>
          <Link to="/SendMessage" className="text-gray-700 hover:text-black">chatbot</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;