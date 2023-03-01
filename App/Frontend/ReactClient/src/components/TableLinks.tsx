import {
  ChartBarIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { LinksTableDataType } from '@/shared/TableTypes';

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
        <div className="align-center flex flex-row items-center text-neutral-200 dark:text-white/[.10]">
          <PencilSquareIcon className="h-5 w-5 transition hover:text-neutral-800 dark:hover:text-white" />
          <ChartBarIcon className="h-5 w-5 transition hover:text-neutral-800 dark:hover:text-white" />
          <TrashIcon className="h-5 w-5 transition hover:text-neutral-800 dark:hover:text-white" />
        </div>
      </td>
    </tr>
  );
}

function TableLinks({ data }: { data: LinksTableDataType[] }) {
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 10;
  const maxPage = Math.ceil(data.length / itemsPerPage);
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const { t } = useTranslation();
  return (
    <>
      <table className="w-full border-collapse text-black dark:text-white">
        <thead className="text-left shadow-sm">
          <tr>
            <th className="h-10 w-[5%] rounded-l-md bg-gray-100 pl-4 dark:bg-[#2a2633]">
              <input type="checkbox" />
            </th>
            <th className="h-10 w-[40%] bg-gray-100 dark:bg-[#2a2633]">
              {t('tableColOriginal')}
            </th>
            <th className="h-10 w-[20%] bg-gray-100 dark:bg-[#2a2633]">
              {t('tableColShort')}
            </th>
            <th className="h-10 w-[15%] bg-gray-100 dark:bg-[#2a2633]">
              {t('tableColDate')}
            </th>
            <th className="h-10 w-[10%] bg-gray-100 dark:bg-[#2a2633]">
              {t('tableColViews')}
            </th>
            <th className="h-10 w-[10%] rounded-r-md bg-gray-100 pr-2 dark:bg-[#2a2633]">
              <span />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.slice(start, end).map((item) => (
            <LinkItem
              key={item.id}
              original={item.original}
              link={item.short}
              date={item.date}
              views={item.views}
            />
          ))}
        </tbody>
      </table>
      <table className="w-full border-collapse text-black dark:text-white">
        <thead className="text-left shadow-sm">
          <tr>
            <th
              className="flex h-10 w-full flex-row items-center justify-center space-x-5 rounded-md bg-gray-100
             pl-4 text-center dark:bg-[#2a2633]"
            >
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                {page}
              </button>
              <button type="button" className="underline">
                {page + 1}
              </button>
              <button
                type="button"
                disabled={page + 1 === maxPage}
                onClick={() => setPage(page + 1)}
              >
                {page + 2}
              </button>
            </th>
          </tr>
        </thead>
      </table>
    </>
  );
}

export default TableLinks;
