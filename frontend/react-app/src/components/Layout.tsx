import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LanguageIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/solid';

function Layout({ children }: { children: React.ReactNode }) {
  const htmlElement = document.documentElement;
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

  return (
    <div className="bg-white dark:bg-[#23212e]">
      <div className="mx-auto grid h-screen w-full max-w-screen-xl grid-rows-[auto_1fr_auto]">
        <header className="flex h-20 items-center justify-between px-10 backdrop-blur-lg">
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
                <a className="uppercase text-black dark:text-white" href="/">
                  Log in / Sign up
                </a>
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
