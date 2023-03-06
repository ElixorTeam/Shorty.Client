import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthState, authStateNumb } from '@/shared/AuthState';
import AuthStage from '@/pages/AuthPage/AuthStage';
import PinStage from '@/pages/AuthPage/PinStage';

function Auth() {
  const [activeMenu, setActiveMenu] = useState<AuthState>(AuthState.auth);
  const stages = [
    {
      component: AuthStage,
    },
    {
      component: PinStage,
    },
  ];
  const CurrentComponent = stages[authStateNumb[activeMenu]].component;

  return (
    <div>
      <CurrentComponent
        setActiveMenu={(state: AuthState) => setActiveMenu(state)}
      />
    </div>
  );
}

export default Auth;
