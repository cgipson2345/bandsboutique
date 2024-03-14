// src/components/Home.js
import React from 'react';
import ringtree from './images/RING.png'

const Home = () => {
  return (
    <div>
      <div className= "flex flex-row  justify-center  justify-items-center gap-x-10 m-10 items-center">
        <div className="left">
          <img src ={ringtree} alt ="dog"/>

        </div>
        <div className="right flex-col justify-center justify-items-center items-center">
          <h1 className="font-bold text-3xl ">Welcome</h1>
          <p>Email Adress</p>
          <div className="border-2 rounded-md px-28 py-5 border-black mb-2"> </div>
          <p>Password</p>
          <div className="border-2 rounded-md px-28 py-5 border-black mb-2"></div>
          <button className='bg-neutral-950  text-white px-28 py-3 rounded-md'>Login</button>


        </div>

      </div>
    </div>
  );
};

export default Home;