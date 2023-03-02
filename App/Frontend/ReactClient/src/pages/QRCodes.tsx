import { ChartBarIcon } from '@heroicons/react/24/solid';

type QRCodeDataType = {
  title: string;
  views: number;
  link: string;
  date: string;
};

function QRCodes() {
  const testData: QRCodeDataType[] = Array(20).fill({
    title: 'Unique link',
    views: 1251,
    link: 'sh0.ty/1f43',
    date: '21.03.23',
  });
  return (
    <div className="mt-8 flex h-full w-full flex-col space-y-2 overflow-y-auto pb-8">
      {testData.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <div className="flex h-40 w-full flex-row items-center space-x-5 rounded-md bg-black/[.05] shadow-sm dark:bg-black/[.20]">
          <img
            src="http://qrcoder.ru/code/?https%3A%2F%2Fgithub.com%2FBaggerFast%2FShorty&4&0"
            alt="qr code"
            className="ml-4 h-32 w-32"
          />
          <div className="w-full">
            <div className="flex w-full flex-row items-center justify-between pr-6">
              <p className="text-4xl font-bold">{item.title}</p>
              <div className="flex flex-row items-center space-x-2 text-gray-700 dark:text-gray-400">
                <ChartBarIcon className="mt-1 h-5 w-5" />
                <p className="text-xl font-bold">{item.views}</p>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-between pr-6">
              <p className="text-gray-700 dark:text-gray-400">{item.link}</p>
              <p className="text-gray-700 dark:text-gray-400">{item.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QRCodes;
