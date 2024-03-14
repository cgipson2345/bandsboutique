// src/components/Home.js
import React from 'react';

const Login = () => {
  return (
  <div className="flex flex-row justify-center items-center h-screen">
    <div className="flex justify-center items-center">
      <img src="rings.png" alt="" className="size-full"/>
    </div>
    <div className="flex flex-col justify-center items-center ml-10">
      <h1 className="mb-4 text-3xl font-bold">Welcome!</h1>
      <p className="text-lg">Email Address</p>
      <input type="text" placeholder="" className="mb-4 w-40 border-2 rounded-md"/>
      <p className="text-lg">Password</p>
      <input type="password" placeholder="" className="mb-4 w-40 border-2 rounded-md"/>
      <button type="button" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40">Login</button>
    </div>
  </div>
  );
};

export default Login;