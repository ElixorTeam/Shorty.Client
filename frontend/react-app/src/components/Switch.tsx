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
    <label htmlFor="themeChange" className="relative inline-block w-12 h-5">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
        className="opacity-0 w-0 h-0"
        id="themeChange"
      />
      <span
        className="absolute cursor-pointer inset-0 bg-gray-200 rounded-2xl spanImage
                       before:absolute before:h-4 before:w-4 before:left-[3px] before:rounded-2xl
                       before:bottom-[2px] before:bg-white slider before:transition"
      />
    </label>
  );
}

export default Switch;
