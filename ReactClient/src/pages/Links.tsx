import React, { ChangeEvent, useCallback, useState } from 'react';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

type LinkDataType = {
  id: number;
  title: string;
  link: string;
  date: string;
};

const enum TableKeyEnum {
  Viewed = 'viewed',
  Last = 'last',
}

function LinkDescription({
  linkData,
  hideLink,
}: {
  linkData: LinkDataType;
  hideLink: () => void;
}) {
  const data = linkData;
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.05)] dark:bg-[#23212e] dark:shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1)] sm:hidden">
        <p className="text-lg font-bold">Link description</p>
        <button type="button" onClick={hideLink}>
          <XMarkIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div className="h-[calc(100%-64px)] bg-white px-4 py-8 dark:bg-[#23212e] sm:h-full sm:rounded-xl md:px-16">
        <div className="flex flex-row items-center justify-between">
          <p className="text-4xl font-bold">{data.title}</p>
          <div className="flex flex-row items-center space-x-4">
            <button
              type="button"
              className="transition hover:scale-105 active:scale-95"
            >
              <TrashIcon className="h-6 w-6 text-red-700" />
            </button>
            <button
              type="button"
              className="transition hover:scale-105 active:scale-95"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="text-md">Создана {data.date}</p>
        <p className="pt-5 text-2xl font-bold text-blue-400">{data.link}</p>
        <p className="pt-5 text-2xl font-bold">QR Код</p>
        <img
          src="http://qrcoder.ru/code/?https%3A%2F%2Fgithub.com%2FBaggerFast%2FShorty&4&0"
          alt="qr code"
        />
      </div>
    </>
  );
}

function Links() {
  const [selectedLink, setSelectedLink] = useState<LinkDataType | null>(null);
  const hideLink = () => {
    setSelectedLink(null);
  };

  const linksData: LinkDataType[] = [
    {
      id: 1,
      title: 'Unique link 1',
      link: 'sh0.ty/1f43',
      date: '21.03.23',
    },
    {
      id: 2,
      title: 'Unique link 2',
      link: 'sh0.ty/1f44',
      date: '22.03.23',
    },
  ];

  const [tableKey, setTableKey] = useState<TableKeyEnum>(TableKeyEnum.Viewed);
  const handleTableKey = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const sortKey = e.target.value as TableKeyEnum;
    setTableKey(sortKey);
  }, []);
  return (
    <div className="sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]">
      <div
        className="z-30 h-[calc(100vh-64px)] shadow-[8px_0px_10px_0px_rgba(0,0,0,0.02)] overflow-y-hidden scrollbar-thin
       hover:overflow-y-auto dark:shadow-[8px_0px_10px_0px_rgba(0,0,0,0.1)]"
      >
        <div className="sticky top-0 flex h-16 w-full items-center bg-white px-5 dark:bg-[#23212e] md:px-10">
          <div className="mr-2 flex flex-row items-center">
            <p className="mr-2 hidden text-gray-700 dark:text-gray-400 md:block">
              Сортировать
            </p>
            <select
              value={tableKey}
              onChange={handleTableKey}
              className="bg-white/[.0] text-black dark:text-white"
            >
              <option value="viewed">Просмотры</option>
              <option value="last">Последние</option>
            </select>
          </div>
        </div>
        {linksData.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${
              selectedLink
                ? `${
                    selectedLink.id === item.id
                      ? 'bg-sky-200 dark:text-black'
                      : 'bg-slate-100 dark:bg-[#1f1e29]'
                  }`
                : 'bg-slate-100 dark:bg-[#1f1e29]'
            } flex h-24 w-full items-center px-5 text-left md:px-10`}
            onClick={() => setSelectedLink(item)}
          >
            <div className="flex w-full flex-col">
              <p className="font-semibold">{item.title}</p>
              <div className="flex w-40 justify-between text-xs text-gray-600">
                <p>{item.link}</p>
                <p>{item.date}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div
        className={`${
          selectedLink ? 'block' : 'hidden'
        } absolute left-0 top-0 z-[60] h-[calc(100vh-64px)] w-screen sm:static sm:z-30 sm:h-full sm:w-full sm:p-3 md:p-6`}
      >
        {selectedLink ? (
          <LinkDescription
            linkData={selectedLink}
            hideLink={() => hideLink()}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Links;
