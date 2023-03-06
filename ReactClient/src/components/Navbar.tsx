import { NavLink } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import React, { ReactNode } from 'react';
import LanguageSwitcher from './LanguageChanger';
import AuthModal from '@/components/AuthModal/AuthModal';

function NavbarItem({ children }: { children: ReactNode }) {
  return <li className="flex items-center">{children}</li>;
}

function Navbar({
  isDarkTheme,
  setTheme,
  isToggleSideBar,
}: {
  isDarkTheme: boolean;
  setTheme: () => void;
  isToggleSideBar: boolean;
}) {
  return (
    <header
      className={`sticky top-0 z-40 flex justify-center px-5 ${
        isToggleSideBar && 'ring-0 ring-gray-400/[.20]'
      }`}
    >
      <div className="flex h-16 w-full max-w-screen-xl items-center justify-between">
        <NavLink
          className="text-2xl font-extrabold text-black dark:text-white"
          to=""
        >
          Shorty
        </NavLink>
        <nav className="flex flex-row items-center">
          <ul className="inline-flex items-center space-x-2 md:space-x-4">
            <NavbarItem>
              <button type="button" onClick={setTheme}>
                {isDarkTheme ? (
                  <MoonIcon className="h-5 w-5 text-white transition hover:scale-105 active:scale-95" />
                ) : (
                  <SunIcon className="h-5 w-5 text-black transition hover:scale-105 active:scale-95" />
                )}
              </button>
            </NavbarItem>
            <NavbarItem>
              <LanguageSwitcher />
            </NavbarItem>
            <NavbarItem>
              <AuthModal />
            </NavbarItem>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
