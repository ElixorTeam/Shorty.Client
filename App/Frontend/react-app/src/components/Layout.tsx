import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LanguageIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { ReactComponent as GoogleIcon } from '../assets/google-icon.svg';
import { ReactComponent as GithubIcon } from '../assets/github-icon.svg';
import useMediaQuery from './useMediaQuery';

function Layout({ children }: { children: React.ReactNode }) {
  const htmlElement = document.documentElement;
  const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);
  const [isDarkTheme, setTheme] = useState<boolean>(
    localStorage.theme === 'dark'
  );

  function onWindowsMatch() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      htmlElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  onWindowsMatch();

  useEffect(() => {
    if (isDarkTheme) {
      htmlElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      htmlElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkTheme, htmlElement]);

  const isAboveSmallScreens = useMediaQuery('(max-width: 640px)');

  return (
    <div className="bg-white dark:bg-[#23212e]">
      <div className="mx-auto grid h-screen w-full max-w-screen-xl grid-rows-[auto_1fr_auto]">
        <header className="z-40 flex h-20 items-center justify-between px-10">
          <NavLink
            className="text-2xl font-extrabold text-black dark:text-white"
            to=""
          >
            Shorty
          </NavLink>
          <nav className="flex flex-row items-center">
            <ul className="inline-flex items-center space-x-5 md:space-x-8">
              <li className="flex items-center">
                {isDarkTheme ? (
                  <MoonIcon
                    className="h-5 w-5 text-white transition hover:scale-105 active:scale-95"
                    onClick={() => setTheme(!isDarkTheme)}
                  />
                ) : (
                  <SunIcon
                    className="h-5 w-5 text-black transition hover:scale-105 active:scale-95"
                    onClick={() => setTheme(!isDarkTheme)}
                  />
                )}
              </li>
              <li className="flex items-center">
                <div className="flex cursor-pointer">
                  <LanguageIcon className="h-5 w-5 text-black dark:text-white" />
                  <ChevronDownIcon className="mt-0.5 h-4 w-4 text-black dark:text-white" />
                </div>
              </li>
              <li className="flex items-center">
                <button
                  type="button"
                  className="uppercase text-black dark:text-white"
                  onClick={() => setIsOpenAuth(!isOpenAuth)}
                >
                  {isAboveSmallScreens ? (
                    <UserIcon className="h-5 w-5 text-black" />
                  ) : (
                    'Login In / Sign Up'
                  )}
                </button>

                {isOpenAuth ? (
                  <div
                    className="absolute top-16 z-20 flex h-60 w-72 -translate-x-64 flex-col items-center rounded-2xl border-[1px]
                   border-solid border-gray-300 bg-gray-50/[.60] shadow-2xl backdrop-blur-xl transition-all dark:border-neutral-600
                    dark:bg-[#2a2633]/[.80] md:-translate-x-36"
                  >
                    <p className="mt-4 uppercase text-black dark:text-white ">
                      {' '}
                      Log in / Sign Up
                    </p>
                    <form className="flex w-full flex-col items-center">
                      <input
                        type="email"
                        required
                        className="placeholder:text-md mt-4 flex h-[34px] w-4/5 rounded-xl border-[1px] border-gray-300 bg-gray-100
                         px-3 shadow-sm outline-none outline-0 placeholder:pl-10 placeholder:text-gray-400 dark:border-neutral-600
                          dark:bg-[#18161c]/[.50] dark:text-white"
                        placeholder="Enter e-mail"
                      />
                      <button
                        type="submit"
                        className="mt-4 h-[34px] w-4/5 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 shadow-md"
                      >
                        <p className="text-white">Enter with email</p>
                      </button>
                    </form>
                    <p className="mt-2 text-sm uppercase text-black dark:text-white">
                      Or with
                    </p>
                    <div className="mt-2 flex w-4/5 flex-row justify-between space-x-5">
                      <button
                        type="button"
                        className="flex h-[34px] w-1/2 flex-row items-center justify-center space-x-1.5 rounded-xl bg-white shadow-md"
                      >
                        <GoogleIcon className="h-5 w-5" />
                        <p className="mb-[2px] text-black">Google</p>
                      </button>
                      <button
                        type="button"
                        className="flex h-[34px] w-1/2 flex-row items-center justify-center space-x-1.5 rounded-xl bg-neutral-800 shadow-md"
                      >
                        <GithubIcon className="h-5 w-5 fill-white" />
                        <p className="text-white">GitHub</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex items-center justify-center">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
