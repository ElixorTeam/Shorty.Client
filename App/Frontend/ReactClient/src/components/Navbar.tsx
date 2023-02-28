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
}: {
  isDarkTheme: boolean;
  setTheme: () => void;
}) {
  return (
    <header className="z-40 flex h-20 items-center justify-between px-10">
      <NavLink
        className="text-2xl font-extrabold text-black dark:text-white"
        to=""
      >
        Shorty
      </NavLink>
      <nav className="flex flex-row items-center">
        <ul className="inline-flex items-center space-x-5 md:space-x-8">
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
    </header>
  );
}

export default Navbar;
