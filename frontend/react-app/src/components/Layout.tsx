import React, { useEffect, useState } from 'react';
import Switch from './Switch';

function Layout({ children }: { children: React.ReactNode }) {
  const htmlElement = document.documentElement;
  const [isDarkTheme, setTheme] = useState(localStorage.theme === 'dark');

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
      <div className="max-w-screen-xl mx-auto h-screen grid grid-rows-layout w-full">
        <header className="h-20 px-10 flex items-center justify-between">
          <a
            className="font-extrabold text-2xl text-black dark:text-white"
            href="/"
          >
            Shorty
          </a>
          <nav className="flex items-center flex-row">
            <ul className="inline-flex space-x-10 items-center">
              <li className="flex items-center">
                <Switch
                  isToggled={isDarkTheme}
                  onToggle={() => setTheme(!isDarkTheme)}
                />
              </li>
              <li className="flex items-center">
                <div className="flex cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 stroke-black dark:stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mt-0.5 stroke-black dark:stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
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
