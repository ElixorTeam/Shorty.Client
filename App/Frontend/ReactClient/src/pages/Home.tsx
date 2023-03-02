import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import sphere from '@/assets/sphere.png';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col-reverse items-center gap-y-10 sm:justify-between md:w-full md:flex-row md:px-20">
      {/* <div className="invisible absolute inset-0 md:visible"> */}
      {/*  /!*<div className="relative h-screen w-full max-w-screen-2xl overflow-hidden selection:bg-transparent">*!/ */}
      {/*  /!*  <img*!/ */}
      {/*  /!*    className="absolute left-[40%] top-[10%] -z-0 h-36 w-36 outline-none blur-md"*!/ */}
      {/*  /!*    src={sphere}*!/ */}
      {/*  /!*    alt=""*!/ */}
      {/*  /!*  />*!/ */}
      {/*  /!*  <img*!/ */}
      {/*  /!*    className="absolute left-10 top-[80%] z-0 h-80 w-80 blur-md"*!/ */}
      {/*  /!*    src={sphere}*!/ */}
      {/*  /!*    alt=""*!/ */}
      {/*  /!*  />*!/ */}
      {/*  /!*  <img*!/ */}
      {/*  /!*    className="absolute left-[90%] top-[-20%] z-0 h-96 w-96 blur-md"*!/ */}
      {/*  /!*    src={sphere}*!/ */}
      {/*  /!*    alt=""*!/ */}
      {/*  /!*  />*!/ */}
      {/*  /!*</div>*!/ */}
      {/* </div> */}
      <div className="z-10 flex w-[300px] flex-col items-center text-center sm:w-[370px] md:block md:text-left lg:w-[470px]">
        <p
          className="bg-gradient-to-r from-black to-gray-600 bg-clip-text pb-4 text-4xl font-bold
           text-transparent dark:from-white dark:to-indigo-300 sm:text-5xl lg:text-6xl"
        >
          {t('welcomeTitle')}
        </p>
        <p className="text-base font-light text-gray-600 dark:text-gray-400 sm:text-lg lg:text-2xl">
          {t('welcomeSubtext')}
        </p>
        <div className="relative">
          <div
            className="absolute inset-0 mt-4 h-10 w-44 rounded-3xl bg-gradient-to-tr from-indigo-300 to-pink-300 opacity-90
               blur-md dark:opacity-30 md:h-14 md:w-64"
          />
          <NavLink to="/link">
            <button
              type="button"
              className="w-50 relative mt-4 h-10 w-44 rounded-3xl bg-gradient-to-tr from-indigo-300 to-pink-300 transition-all hover:scale-105 active:scale-95 sm:h-11
                sm:w-52 md:h-14 md:w-64"
            >
              <p className="text-base uppercase text-white sm:text-lg md:text-2xl">
                {t('buttonTryRightNow')}
              </p>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="flex w-2/6 items-center md:block md:w-1/4">
        <div className="relative">
          <div
            className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2
               bg-purple-400 opacity-40 blur-3xl"
          />
          <img className="selection:bg-transparent" src={sphere} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default Home;
