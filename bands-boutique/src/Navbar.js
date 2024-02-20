import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">My Online Shop</div>
          <div className="space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">Shop</a>
            <a href="#" className="text-white">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;