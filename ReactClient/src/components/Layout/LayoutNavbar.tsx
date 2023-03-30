import { LinkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

function LayoutNavbar() {
  return (
    <div className="z-40 h-full shadow-[8px_0px_10px_0px_rgba(0,0,0,0.0)] dark:shadow-[8px_0px_10px_-3px_rgba(0,0,0,0.1)]">
      <nav className="mx-auto flex flex-col items-center lg:w-32">
        <NavLink to="/create">
          <button
            type="button"
            className="mb-10 mt-5 h-7 w-7 rounded-lg bg-blue-300 shadow-xl shadow-blue-200 dark:shadow-blue-200/[.1] lg:w-32 lg:rounded-xl"
          >
            <p className="hidden text-base text-white lg:block">Добавить</p>
            <p className="block text-lg text-white lg:hidden">+</p>
          </button>
        </NavLink>
        <ul className="flex flex-col items-center space-y-6 text-base font-semibold text-black dark:text-white">
          <NavLink
            to="links"
            className={({ isActive }) =>
              isActive ? 'w-full text-sky-400' : 'w-full text-gray-400'
            }
          >
            <li className="flex w-full flex-row items-center justify-center space-x-2 lg:justify-normal">
              <LinkIcon className="h-6 w-6" />
              <p className="hidden lg:block">Ссылки</p>
            </li>
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive ? 'w-full text-sky-400' : 'w-full text-gray-400'
            }
          >
            <li className="flex w-full flex-row items-center justify-center space-x-2 lg:justify-normal">
              <Cog6ToothIcon className="h-6 w-6" />
              <p className="hidden lg:block">Профиль</p>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default LayoutNavbar;
