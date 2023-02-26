import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
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
        <Navbar
          isDarkTheme={isDarkTheme}
          setTheme={() => setTheme(!isDarkTheme)}
        />
        <main className="flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
