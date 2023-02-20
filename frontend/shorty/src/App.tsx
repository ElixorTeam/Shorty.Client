import React from 'react';
import sphere from './sphere.png';
import Layout from "./components/Layout";
import './index.css';

const App = () => {
  return (
    <Layout>
      {/*<div className="">*/}
      {/*    <img className="absolute w-36 h-36 left-[40%] top-[10%] blur-md z-0" src={sphere} alt=""/>*/}
      {/*    <img className="absolute w-80 h-80 left-10 top-[80%] blur-md z-0" src={sphere} alt=""/>*/}
      {/*    <img className="absolute w-96 h-96 left-[90%] -top-[20%] blur-md z-0" src={sphere} alt=""/>*/}
      {/*</div>*/}
      <div className="w-full overflow-visible md:w-2/5 text-center flex flex-col items-center md:block md:text-left">
        <p className="font-bold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-indigo-300">Let’s short your links together</p>
        <p className="font-light mt-4 text-2xl text-gray-600 dark:text-gray-400 ">Leave the idea that links should be long</p>
        <div className="relative">
          <div
            className="absolute opacity-90 blur-md inset-0 w-64 h-14 bg-gradient-to-tr from-indigo-300 to-pink-300 rounded-3xl mt-4 dark: opacity-50"></div>
          <button className="relative w-64 h-14 bg-gradient-to-tr from-indigo-300 to-pink-300 rounded-3xl mt-4">
            <p className="uppercase text-2xl text-white">Try right now</p>
          </button>
        </div>
      </div>
      <div className="hidden md:block md:w-1/5">
      </div>
      <div className="hidden md:block md:w-1/4">
        <div className="relative">
          <div
            className="absolute invisible opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl bg-purple-400 w-64 h-64 md:visible"></div>
          <img className="invisible w-96 md:visible" src={sphere} alt="img"/>
        </div>
      </div>
    </Layout>
  );
}

export default App;
