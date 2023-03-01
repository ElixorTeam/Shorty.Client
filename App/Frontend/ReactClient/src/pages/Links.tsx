import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TableLinks from '@/components/TableLinks';
import { LinksTableDataType } from '@/shared/TableTypes';

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
  const testData: LinksTableDataType[] = Array(14).fill({
    id: 1,
    original: 'youtube.com',
    short: 'yb.co',
    date: '20.01.23',
    views: 420,
  });

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
          </div>
        </div>
        <TableLinks data={testData} />
      </div>
    </div>
  );
}

export default Links;
