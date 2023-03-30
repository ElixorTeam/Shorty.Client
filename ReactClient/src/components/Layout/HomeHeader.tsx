import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Switchers/LanguageSwitcher';
import ThemeSwitcher from '@/components/Switchers/ThemeSwitcher';

function NavbarItem({ children }: { children: ReactNode }) {
  return <li className="flex items-center">{children}</li>;
}

function HomeHeader() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 flex justify-center px-5">
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
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem>
              <LanguageSwitcher />
            </NavbarItem>
            <NavbarItem>
              <NavLink to="auth">
                <p>{t('navBarLogin')}</p>
              </NavLink>
            </NavbarItem>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HomeHeader;
