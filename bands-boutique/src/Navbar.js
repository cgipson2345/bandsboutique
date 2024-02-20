// src/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-gray-700 font-bold text-xl">Bands Boutique</div>
        <div className="flex space-x-6"> {/* Increased spacing with space-x-6 */}
          <a href="#" className="text-gray-700 hover:text-black">Home</a>
          <a href="#" className="text-gray-700 hover:text-black">Shop</a>
          <a href="#" className="text-gray-700 hover:text-black">Categories</a>
          <a href="#" className="text-gray-700 hover:text-black">About</a>
          <a href="#" className="text-gray-700 hover:text-black">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;