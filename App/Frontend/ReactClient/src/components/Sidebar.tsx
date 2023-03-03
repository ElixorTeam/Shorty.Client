import { NavLink } from 'react-router-dom';
import { LinkIcon, Cog6ToothIcon, QrCodeIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

function CustomLink({
  name,
  link,
  children,
}: {
  name: string;
  link: string;
  children: ReactNode;
}) {
  return (
    <NavLink to={link} className="flex flex-row items-center space-x-2">
      {children}
      <li className="text-lg hover:text-[#c19bff]">{name}</li>
    </NavLink>
  );
}

function Sidebar() {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="flex flex-col space-y-2 text-xl text-black dark:text-white">
        <li>
          <NavLink to="/create">
            <button
              type="button"
              className="h-6 w-32 rounded-md bg-gradient-to-tr from-purple-600 to-pink-400"
            >
              <p className="text-base text-white">{t('sideBarAdd')}</p>
            </button>
          </NavLink>
        </li>
        <CustomLink name={t('sideBarLinks')} link="/link">
          <LinkIcon className="h-4 w-4" />
        </CustomLink>
        <CustomLink name={t('sideBarQRCodes')} link="/qrcodes">
          <QrCodeIcon className="h-4 w-4" />
        </CustomLink>
        <CustomLink name={t('sideBarSettings')} link="/settings">
          <Cog6ToothIcon className="h-4 w-4" />
        </CustomLink>
      </ul>
    </nav>
  );
}

export default Sidebar;
