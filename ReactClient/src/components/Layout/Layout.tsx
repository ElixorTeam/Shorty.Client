import { Outlet } from 'react-router-dom';
import LayoutNavbar from './LayoutNavbar';
import LayoutHeader from './LayoutHeader';

function Layout() {
  return (
    <>
      <LayoutHeader />
      <div className="grid h-[calc(100vh-64px)] grid-cols-[50px_1fr] lg:grid-cols-[200px_1fr]">
        <div className="z-40 shadow-[8px_0px_10px_0px_rgba(0,0,0,0.02)]">
          <LayoutNavbar />
        </div>
        <main className="bg-[#eef1f6] dark:bg-[#1c1a25]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
