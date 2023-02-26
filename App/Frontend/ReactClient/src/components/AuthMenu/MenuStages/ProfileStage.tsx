import React from 'react';
import MenuState from '@/shared/MenuState';

function ProfileStage({
  setActiveMenu,
}: {
  setActiveMenu: (state: MenuState) => void;
}) {
  return (
    <>
      <p className="uppercase text-black dark:text-white">Profile Stage</p>
      <button
        type="button"
        className="serviceIcon bg-white"
        onClick={() => setActiveMenu(MenuState.auth)}
      >
        <p className="mb-[2px] text-black">Google</p>
      </button>
    </>
  );
}

export default ProfileStage;
