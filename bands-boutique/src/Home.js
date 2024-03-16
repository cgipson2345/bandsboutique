// src/components/Home.js


import React from 'react';


const Home = () => {
  return (
    <div >
      <div className= "flex flex-row  justify-center  justify-items-center gap-x-10 m-10 items-center">
        <div className="left">
          <img src ={'/images/ring.png'} alt ="dog"/>
        </div>
      </div>
    </div>
  );
};

export default Home;