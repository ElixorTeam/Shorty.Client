import {
  PencilSquareIcon,
  ChartBarIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback, useState } from 'react';
import Sidebar from '@/components/Sidebar';

function LinkItem({
  original,
  link,
  date,
  views,
}: {
  original: string;
  link: string;
  date: string;
  views: number;
}) {
  return (
    <tr>
      <td className="h-10 pl-4">
        <input type="checkbox" />
      </td>
      <td>{original}</td>
      <td>{link}</td>
      <td>{date}</td>
      <td>{views}</td>
      <td>
        <div className="align-center flex flex-row items-center">
          <PencilSquareIcon className="h-5 w-5" />
          <ChartBarIcon className="h-5 w-5" />
          <TrashIcon className="h-5 w-5" />
        </div>
      </td>
    </tr>
  );
}

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

  return (
    <div className="grid h-full w-full grid-cols-[200px_1fr] px-10 pt-8">
      <div className="flex">
        <Sidebar />
      </div>
      <div>
        <div className="mb-4 flex h-9 flex-row-reverse">
          <button
            type="button"
            className="h-full w-40 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 transition hover:scale-105 active:scale-95"
          >
            <p className="uppercase text-white">{t('buttonAdd')}</p>
          </button>
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
            {/* <div className="flex cursor-pointer flex-row items-center text-gray-200 hover:text-white"> */}
            {/*  */}
            {/*  /!* <ChevronDownIcon className="h-5 w-5 pt-1" /> *!/ */}
            {/* </div> */}
          </div>
        </div>
        <table className="w-full border-collapse text-black dark:text-white">
          <thead className="text-left shadow-sm">
            <tr>
              <th className="h-12 w-[5%] rounded-l-md bg-gray-200 pl-4 dark:bg-[#2a2633]">
                <input type="checkbox" />
              </th>
              <th className="h-10 w-[40%] bg-gray-200 dark:bg-[#2a2633]">
                {t('tableColOriginal')}
              </th>
              <th className="h-10 w-[20%] bg-gray-200 dark:bg-[#2a2633]">
                {t('tableColShort')}
              </th>
              <th className="h-10 w-[15%] bg-gray-200 dark:bg-[#2a2633]">
                {t('tableColDate')}
              </th>
              <th className="h-10 w-[10%] bg-gray-200 dark:bg-[#2a2633]">
                {t('tableColViews')}
              </th>
              <th className="h-10 w-[10%] rounded-r-md bg-gray-200 pr-2 dark:bg-[#2a2633]">
                <span />
              </th>
            </tr>
          </thead>
          <tbody>
            <LinkItem
              original="youtube.com"
              link="yb.cm"
              date="26.02.23"
              views={4245}
            />
            <LinkItem
              original="youtube.com"
              link="yb.cm"
              date="26.02.23"
              views={4245}
            />
            <LinkItem
              original="youtube.com"
              link="yb.cm"
              date="26.02.23"
              views={4245}
            />
          </tbody>
        </table>
        <table className="w-full border-collapse text-black dark:text-white">
          <thead className="text-left shadow-sm">
            <tr>
              <th className="h-12 w-full rounded-l-md bg-gray-200 pl-4 text-center dark:bg-[#2a2633]">
                <p>Page 1</p>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Links;
