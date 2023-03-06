import { PinField } from 'react-pin-field';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '@/shared/AuthState';

function PinStage({
  setActiveMenu,
}: {
  setActiveMenu: (state: AuthState) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="h-100 m-auto flex h-max w-2/3 flex-col items-center justify-center  rounded-lg border-[1px] border-gray-400/[.20] p-32">
      <p className="mb-10 text-4xl font-bold dark:text-white">
        {t('authPinCode')}
      </p>
      <p className="px-5 pt-1 text-sm text-gray-400">
        {t('authPinCodeDescription')}
      </p>
      <div className="mb-6 flex gap-x-4 py-4">
        <PinField
          length={5}
          validate="0123456789"
          inputMode="numeric"
          autoFocus
          className="h-10 w-8 rounded-md bg-black/[.05] text-center text-lg shadow-sm dark:bg-black/[.30] dark:text-white"
        />
      </div>
      <button
        type="submit"
        onClick={() => navigate('../link')}
        className="my-2 h-[34px] w-6/12 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 shadow-md"
      >
        <p className="text-white">{t('authEnterPinCode')}</p>
      </button>
    </div>
  );
}

export default PinStage;
