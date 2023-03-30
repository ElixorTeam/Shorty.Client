import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

type LanguageOption = {
  label: string;
  value: string;
};

const languageOptions: LanguageOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' },
];

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (option: LanguageOption) => {
    i18n.changeLanguage(option.value).then(() => i18n.reloadResources());
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mx-auto flex h-10 w-16 items-center justify-center transition hover:scale-105 active:scale-95 dark:text-white"
        >
          <LanguageIcon className="h-5 w-5" />
          <ChevronDownIcon className="h-3 w-3" />
        </button>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 w-28 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/[.10]
           backdrop-blur-md dark:bg-[#2a2633]/[.80] dark:ring-white/[.20]"
        >
          {languageOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${
                option.value === i18n.language
                  ? 'bg-gray-100 text-black dark:bg-white/[.10] dark:text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]'
              } block w-full px-4 py-2 text-left text-sm leading-5`}
              onClick={() => handleLanguageSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
