import { NavLink } from 'react-router-dom';
import {
  ChevronDownIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import useMediaQuery from './useMediaQuery';
import AuthMenu from './AuthMenu/AuthMenu';

function Navbar({
  isDarkTheme,
  setTheme,
}: {
  isDarkTheme: boolean;
  setTheme: () => void;
}) {
  const isAboveSmallScreens = useMediaQuery('(max-width: 640px)');
  const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);

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
          <li className="flex items-center">
            {isDarkTheme ? (
              <MoonIcon
                className="h-5 w-5 text-white transition hover:scale-105 active:scale-95"
                onClick={setTheme}
              />
            ) : (
              <SunIcon
                className="h-5 w-5 text-black transition hover:scale-105 active:scale-95"
                onClick={setTheme}
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
                'Log In / Sign Up'
              )}
            </button>
            {isOpenAuth ? <AuthMenu /> : ''}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
