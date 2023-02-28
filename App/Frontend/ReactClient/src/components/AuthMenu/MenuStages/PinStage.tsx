import React,{useRef} from 'react';
import MenuState from '@/shared/MenuState';


function PinStage({
  setActiveMenu,
}: {
  setActiveMenu: (state: MenuState) => void;

}) {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);
  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentInput = event.target as HTMLInputElement;
    const currentInputValue = currentInput.value;
    const currentInputLength = currentInputValue.length;
    if (currentInputLength === currentInput.maxLength) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };
  return (
    <>
      <p className="uppercase text-black dark:text-white ">Pin Stage</p>
      <div className="flex gap-x-2.5 pt-6 pb-6">
        <input className="pincode_item"
          ref={(el) => el && (inputsRef.current[0] = el)}
          type="text"
          pattern="[0-9]*"
          maxLength={1}
          required
          onKeyUp={(event) => handleInputKeyUp(event, 0)}
        />
        <input className="pincode_item"
          ref={(el) => el && (inputsRef.current[1] = el)}
          type="text"
          pattern="[0-9]*"
          maxLength={1}
          required
          onKeyUp={(event) => handleInputKeyUp(event, 1)}
        />
        <input className="pincode_item"
          ref={(el) => el && (inputsRef.current[2] = el)}
          type="text"
          maxLength={1}
          pattern="[0-9]*"
          required
          onKeyUp={(event) => handleInputKeyUp(event, 2)}
        />
        <input className="w-10 h-10 text-center rounded-lg"
          ref={(el) => el && (inputsRef.current[3] = el)}
          type="text"
          pattern="[0-9]*"
          maxLength={1}
          required
          onKeyUp={(event) => handleInputKeyUp(event, 3)}
        />
        <input className="w-10 h-10 text-center rounded-lg"
          ref={(el) => el && (inputsRef.current[4] = el)}
          type="text"
          maxLength={1}
          pattern="[0-9]*"
          required
          onKeyUp={(event) => handleInputKeyUp(event, 4)}
        />
      </div>
      <button
        type="button"
        className="serviceIcon bg-white"
        onClick={() => setActiveMenu(MenuState.profile)}
      >
        <p className="mb-[2px] text-black">Google</p>
      </button>
    </>
  );
}

export default PinStage;
