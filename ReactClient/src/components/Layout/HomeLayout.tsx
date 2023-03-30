import { Outlet } from 'react-router-dom';
import HomeHeader from './HomeHeader';

function HomeLayout() {
  return (
    <>
      <HomeHeader />
      <div className="overflow-hidden">
        <main className="mx-auto h-[calc(100vh-64px)] max-w-screen-xl">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default HomeLayout;
