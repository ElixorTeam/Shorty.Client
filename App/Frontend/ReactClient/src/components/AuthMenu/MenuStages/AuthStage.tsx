import React from 'react';
import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';
import { ReactComponent as GithubIcon } from '@/assets/github-icon.svg';
import MenuState from '@/shared/MenuState';

function AuthStage({
  setActiveMenu,
}: {
  setActiveMenu: (state: MenuState) => void;
}) {
  return (
    <>
      <p className="uppercase text-black dark:text-white ">Log in / Sign Up</p>
      <form className="flex w-full flex-col items-center">
        <input
          type="email"
          required
          className="placeholder:text-md mt-4 flex h-[34px] w-4/5 rounded-xl border-[1px] border-gray-300 bg-gray-100
      px-3 shadow-sm outline-none outline-0 placeholder:pl-10 placeholder:text-gray-400 dark:border-neutral-600
      dark:bg-[#18161c]/[.50] dark:text-white"
          placeholder="Enter e-mail"
        />
        <button
          type="submit"
          className="mt-4 h-[34px] w-4/5 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 shadow-md"
        >
          <p className="text-white">Enter with email</p>
        </button>
      </form>
      <p className="mt-2 text-sm uppercase text-black dark:text-white">
        Or with
      </p>
      <div className="mt-2 flex w-4/5 flex-row justify-between space-x-5">
        <button
          type="button"
          className="serviceIcon bg-white"
          onClick={() => setActiveMenu(MenuState.pin)}
        >
          <GoogleIcon className="h-5 w-5" />
          <p className="mb-[2px] text-black">Google</p>
        </button>
        <button type="button" className="serviceIcon bg-neutral-800">
          <GithubIcon className="h-5 w-5 fill-white" />
          <p className="text-white">GitHub</p>
        </button>
      </div>
    </>
  );
}

export default AuthStage;
