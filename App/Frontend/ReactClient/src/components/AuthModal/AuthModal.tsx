import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserIcon } from '@heroicons/react/24/solid';
import useMediaQuery from '@/components/useMediaQuery';
import { MenuState, menuStateNumb } from '@/shared/MenuState';
import AuthStage from './MenuStages/AuthStage';
import PinStage from './MenuStages/PinStage';
import ProfileStage from './MenuStages/ProfileStage';

function AuthModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<MenuState>(MenuState.auth);
  const isAboveSmallScreens = useMediaQuery('(max-width: 640px)');
  const { t } = useTranslation();
  const handleLogText = () => {
    if (activeMenu === MenuState.profile) return t('menu');
    return t('login');
  };

  const stages = [
    {
      component: AuthStage,
    },
    {
      component: PinStage,
    },
    {
      component: ProfileStage,
    },
  ];
  const CurrentComponent = stages[menuStateNumb[activeMenu]].component;

  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          className="flex items-center text-black transition hover:scale-105 active:scale-95 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isAboveSmallScreens ? (
            <UserIcon className="h-5 w-5 text-black dark:text-white" />
          ) : (
            handleLogText()
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 rounded-xl bg-white/[.70] py-1 shadow-lg ring-1 ring-black/[.10] backdrop-blur-md dark:bg-[#2a2633]/[.70] dark:ring-white/[.20]">
          <CurrentComponent
            setActiveMenu={(state: MenuState) => setActiveMenu(state)}
          />
        </div>
      )}
    </div>
  );
}

export default AuthModal;
