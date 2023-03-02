import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ isToggleSideBar }: { isToggleSideBar: boolean }) {
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
    <>
      <Navbar
        isDarkTheme={isDarkTheme}
        setTheme={() => setTheme(!isDarkTheme)}
        isToggleSideBar={isToggleSideBar}
      />
      <div className="overflow-hidden">
        <main className="mx-auto h-[calc(100vh-64px)] max-w-screen-xl">
          {isToggleSideBar ? (
            <div className="grid h-full w-full grid-cols-[200px_1fr] border-r-[1px] border-gray-400/[.40]">
              <div className="sticky flex border-r-[1px] border-gray-400/[.20] pt-8">
                <Sidebar />
              </div>
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </>
  );
}

export default Layout;
