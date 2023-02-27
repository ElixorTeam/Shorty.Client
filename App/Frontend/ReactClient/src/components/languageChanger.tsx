import { useCallback, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const lang = e.target.value;
      i18n.changeLanguage(lang).then(() => i18n.reloadResources());
    },
    [i18n]
  );

  return (
    <select
      value={i18n.language}
      onChange={handleChangeLanguage}
      className="text-md  bg-white/[.0] text-black dark:text-white"
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  );
}

export default LanguageSwitcher;
