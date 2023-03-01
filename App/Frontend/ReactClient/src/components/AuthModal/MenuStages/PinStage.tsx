import { PinField } from 'react-pin-field';
import React from 'react';
import { MenuState } from '@/shared/MenuState';

function PinStage({
  setActiveMenu,
}: {
  setActiveMenu: (state: MenuState) => void;
}) {
  return (
    <div className="m-2 flex w-60 flex-col items-center">
      <p className="uppercase text-black dark:text-white ">Enter pin code</p>
      <p className="px-5 pt-1 text-sm text-gray-400">
        The PIN code has been sent to your email. Click here to resend.
      </p>
      <div className="flex gap-x-2.5 py-4">
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
        onClick={() => setActiveMenu(MenuState.profile)}
        className="my-2 h-[34px] w-11/12 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 shadow-md"
      >
        <p className="text-white">Send PIN code</p>
      </button>
    </div>
  );
}

export default PinStage;
