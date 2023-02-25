import React from 'react';
import './Switch.css';

function Switch({
  isToggled,
  onToggle,
}: {
  isToggled: boolean;
  onToggle: () => void;
}) {
  return (
    <label htmlFor="themeChange" className="relative inline-block h-5 w-12">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
        className="h-0 w-0 opacity-0"
        id="themeChange"
      />
      <span
        className="slider absolute inset-0 cursor-pointer rounded-2xl bg-gray-200 before:absolute before:left-[3px]
         before:bottom-[2px] before:h-4 before:w-4 before:rounded-2xl before:bg-white before:transition"
      />
    </label>
  );
}

export default Switch;
