import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback, useState } from 'react';

type TestDataType = {
  id: number;
  title: string;
  link: string;
  date: string;
};

const enum TableKeyEnum {
  Viewed = 'viewed',
  Last = 'last',
}

function Links() {
  const { t } = useTranslation();
  const [tableKey, setTableKey] = useState<TableKeyEnum>(TableKeyEnum.Viewed);
  const handleTableKey = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as TableKeyEnum;
    setTableKey(lang);
  }, []);
  const testData: TestDataType[] = Array(20).fill({
    id: 1,
    title: 'Unique link',
    link: 'sh0.ty/1f43',
    date: '21.03.23',
  });
  return (
    <div className="grid h-full w-full grid-cols-[300px_1fr] overflow-y-auto">
      <div className="h-[calc(100vh-64px)] overflow-y-auto bg-black/[.03]">
        <div className="flex h-16 w-full items-center border-b-[1px] border-gray-400/[.60] px-10 shadow-sm dark:bg-white/[.05]">
          <div className="mr-2 flex flex-row items-center">
            <p className="mr-2 text-gray-500">{t('sortBy')}</p>
            <select
              value={tableKey}
              onChange={handleTableKey}
              className="bg-white/[.0] text-black dark:text-white"
            >
              <option value="viewed">{t('tableKeyViewed')}</option>
              <option value="last">{t('tableKeyAdded')}</option>
            </select>
          </div>
        </div>
        <div className="flex h-24 w-full items-center border-b-[1px] border-gray-400/[.60] bg-white px-10 shadow-md dark:bg-white/[.05]">
          <div className="flex w-full flex-col">
            <p>Unique link</p>
            <div className="flex w-full justify-between">
              <p className="text-xs">sho.ty/f71</p>
              <p className="text-xs">21.03.23</p>
            </div>
          </div>
        </div>
        {testData.map((item) => (
          <button
            type="button"
            className="flex h-24 w-full items-center border-b-[1px] border-gray-400/[.40] px-10 text-left"
          >
            <div className="flex w-full flex-col">
              <p className="font-semibold">{item.title}</p>
              <div className="flex w-full justify-between text-xs text-gray-600">
                <p>{item.link}</p>
                <p>{item.date}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="ring-100 h-[calc(100vh-64px)] overflow-y-auto py-10 px-28 ring-gray-400/[.20]">
        <p className="text-4xl font-bold">Unique title</p>
        <p className="text-md">Created 21 March 2023 5:20PM</p>
        <p className="pt-5 text-2xl font-bold text-blue-400">sh0.ty/f712</p>
        <p className="pt-5 text-2xl font-bold">QR Code</p>
        <img
          src="http://qrcoder.ru/code/?https%3A%2F%2Fgithub.com%2FBaggerFast%2FShorty&4&0"
          alt="qr code"
        />
      </div>
    </div>
  );
}

export default Links;
