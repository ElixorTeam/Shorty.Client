import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { AuthState } from '@/shared/AuthState';
import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';
import { ReactComponent as GithubIcon } from '@/assets/github-icon.svg';

function AuthStage({
  setActiveMenu,
}: {
  setActiveMenu: (state: AuthState) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => setActiveMenu(AuthState.pin);
  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" h-100 m-auto flex h-max w-2/3 flex-col items-center justify-center  rounded-lg p-32"
    >
      <p className=" mb-10 text-4xl font-bold dark:text-white">
        {t('navBarLogin')}
      </p>
      <div className="mb-10 w-2/3">
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="example@gmal.com"
          className="h-10 w-full rounded p-5 text-lg text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white"
        />
        {errors.email && <p className="text-red-700">{t('inputRequired')}</p>}
      </div>
      <button
        type="submit"
        className="h-10 w-2/3 rounded-md bg-gradient-to-tr from-purple-600 to-pink-400 text-lg font-semibold text-white"
      >
        {t('authEnterSubmit')}
      </button>
      <p className="my-3">{t('authOrWith')}</p>
      <div className="mt-2 flex w-11/12 flex-row justify-between space-x-4">
        <button type="button" className="serviceIcon bg-white">
          <GoogleIcon className="h-5 w-5" />
          <p className="mb-[2px] text-black">Google</p>
        </button>
        <button type="button" className="serviceIcon bg-neutral-800">
          <GithubIcon className="h-5 w-5 fill-white" />
          <p className="text-white">GitHub</p>
        </button>
      </div>
    </form>
  );
}

export default AuthStage;
