import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CustomLink({ name, link }: { name: string; link: string }) {
  return (
    <NavLink to={link}>
      <li className="hover:text-[#c19bff]">{name}</li>
    </NavLink>
  );
}

function Sidebar() {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="flex flex-col space-y-2 text-xl text-black dark:text-white">
        <CustomLink name={t('sidebarLink')} link="/link" />
        <CustomLink name={t('buttonAdd')} link="/create" />
        <CustomLink name="QR Codes" link="/qrcodes" />
        <CustomLink name={t('sidebarSettings')} link="/settings" />
      </ul>
    </nav>
  );
}

export default Sidebar;
