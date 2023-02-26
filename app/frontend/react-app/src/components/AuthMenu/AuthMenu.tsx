import React, { useState } from 'react';
import MenuState from '@/shared/MenuState';
import AuthStage from './MenuStages/AuthStage';
import PinStage from './MenuStages/PinStage';
import ProfileStage from './MenuStages/ProfileStage';

function AuthMenu() {
  const [activeMenu, setActiveMenu] = useState<MenuState>(MenuState.auth);

  return (
    <div
      className="absolute top-16 z-20 flex w-72 -translate-x-64 flex-col items-center rounded-2xl border-[1px] border-solid
    border-gray-300 bg-gray-50/[.60] p-4 shadow-2xl backdrop-blur-xl dark:border-neutral-600 dark:bg-[#2a2633]/[.80] md:-translate-x-36"
    >
      {activeMenu === MenuState.auth ? (
        <AuthStage setActiveMenu={(state: MenuState) => setActiveMenu(state)} />
      ) : (
        ''
      )}
      {activeMenu === MenuState.pin ? (
        <PinStage setActiveMenu={(state: MenuState) => setActiveMenu(state)} />
      ) : (
        ''
      )}
      {activeMenu === MenuState.profile ? (
        <ProfileStage
          setActiveMenu={(state: MenuState) => setActiveMenu(state)}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default AuthMenu;
