import React from 'react';
import sphere from '../sphere.png';
import './App.css';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto h-screen grid grid-rows-layout">

      <header className="h-20 px-10 flex items-center justify-between">

        <a className="font-extrabold text-2xl" href="#">Shorty</a>

        <nav className="flex items-center flex-row">
          <ul className="inline-flex space-x-10 items-center">

            <li className="flex items-center">
              <button className="border border-gray-400 bg-gray-100 w-12 h-5 rounded-2xl relative">
                <span className="absolute left-px top-px bg-white w-4 h-4 rounded-2xl shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth="1.5" stroke="currentColor" className="w-full stroke-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                    </svg>
                </span>
              </button>
            </li>

            <li className="flex items-center">
              <div className="flex cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-4 h-4 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
              </div>
            </li>

            <li className="flex items-center">
              <a className="uppercase" href="#">Log in / Sign up</a>
            </li>

          </ul>
        </nav>
      </header>

      <main className="flex items-center justify-center">
        {/*<div className="">*/}
        {/*    <img className="absolute w-36 h-36 left-[40%] top-[10%] blur-md z-0" src={sphere} alt=""/>*/}
        {/*    <img className="absolute w-80 h-80 left-10 top-[80%] blur-md z-0" src={sphere} alt=""/>*/}
        {/*    <img className="absolute w-96 h-96 left-[90%] -top-[20%] blur-md z-0" src={sphere} alt=""/>*/}
        {/*</div>*/}
        <div className="w-2/5">
          <p className="font-bold text-6xl">Let’s short your links together</p>
          <p className="font-light mt-5 text-2xl text-gray-600">Leave the idea that links should be long</p>
          <div className="relative">
            <div
              className="absolute opacity-90 blur-md inset-0 w-64 h-14 bg-gradient-to-tr from-indigo-300 to-pink-300 rounded-3xl mt-4"></div>
            <button className="relative w-64 h-14 bg-gradient-to-tr from-indigo-300 to-pink-300 rounded-3xl mt-4">
              <p className="uppercase text-2xl text-white">Try right now</p>
            </button>
          </div>
        </div>
        <div className="w-1/5">
        </div>
        <div className="w-1/4">
          <div className="relative">
            <div
              className="absolute opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl bg-purple-400 w-64 h-64"></div>
            <img className="w-96" src={sphere} alt="img"/>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
