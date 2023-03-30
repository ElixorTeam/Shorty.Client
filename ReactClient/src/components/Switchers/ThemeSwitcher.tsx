import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function ThemeSwitcher() {
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
    <button type="button" onClick={() => setTheme(!isDarkTheme)}>
      {isDarkTheme ? (
        <MoonIcon className="h-5 w-5 transition hover:scale-105 active:scale-95 dark:text-white" />
      ) : (
        <SunIcon className="h-5 w-5 transition hover:scale-105 active:scale-95 dark:text-white" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
