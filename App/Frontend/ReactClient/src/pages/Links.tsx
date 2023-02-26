import { NavLink } from 'react-router-dom';
import {
  PencilSquareIcon,
  ChartBarIcon,
  TrashIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';

function CustomLink({ name, link }: { name: string; link: string }) {
  return (
    <NavLink to={link}>
      <li className="hover:text-[#c19bff]">{name}</li>
    </NavLink>
  );
}

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

function Links() {
  return (
    <div className="grid h-full w-full grid-cols-[200px_1fr] px-10 pt-8">
      <div className="flex">
        <nav>
          <ul className="flex flex-col space-y-2 text-xl text-black dark:text-white">
            <CustomLink name="Link" link="/link" />
            <CustomLink name="Analytics" link="/analytics" />
            <CustomLink name="Notification" link="/notification" />
            <CustomLink name="Settings" link="/settings" />
          </ul>
        </nav>
      </div>
      <div>
        <div className="mb-4 flex h-9 flex-row-reverse">
          <button
            type="button"
            className="h-full w-40 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300"
          >
            <p className="text-white">Add new</p>
          </button>
          <div className="mr-2 flex flex-row items-center">
            <p className="mr-2 text-gray-400">Sort by</p>
            <div className=" flex flex-row items-center">
              <p className="text-white">Most used</p>
              <ChevronDownIcon className="h-5 w-5 pt-1 text-white" />
            </div>
          </div>
        </div>
        <table className="w-full border-collapse text-black dark:text-white">
          <thead className="text-left shadow-sm">
            <tr>
              <th className="h-12 w-[5%] rounded-l-md bg-gray-200 pl-4 dark:bg-[#2a2633]">
                <input type="checkbox" />
              </th>
              <th className="h-10 w-[40%] bg-gray-200 dark:bg-[#2a2633]">
                Original link
              </th>
              <th className="h-10 w-[20%] bg-gray-200 dark:bg-[#2a2633]">
                Short link
              </th>
              <th className="h-10 w-[15%] bg-gray-200 dark:bg-[#2a2633]">
                Create date
              </th>
              <th className="h-10 w-[10%] bg-gray-200 dark:bg-[#2a2633]">
                Views
              </th>
              <th className="h-10 w-[10%] rounded-r-md bg-gray-200 pr-2 dark:bg-[#2a2633]">
                Tools
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
      </div>
    </div>
  );
}

export default Links;
