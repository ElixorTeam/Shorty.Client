import sphere from './assets/sphere.png';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="flex flex-col-reverse items-center gap-y-10 sm:justify-between md:mx-20 md:w-full md:flex-row lg:mx-40">
        <div className="flex w-[300px] flex-col items-center text-center sm:w-[350px] md:block md:text-left lg:w-[450px]">
          <p
            className="bg-gradient-to-r from-black to-gray-600 bg-clip-text pb-4 text-4xl font-bold
           text-transparent dark:from-white dark:to-indigo-300 sm:text-5xl lg:text-6xl"
          >
            Let’s short your links together
          </p>
          <p className="text-base font-light text-gray-600 dark:text-gray-400 sm:text-lg lg:text-2xl">
            Leave the idea that links should be long
          </p>
          <div className="relative">
            <div
              className="absolute inset-0 mt-4 h-10 w-44 rounded-3xl bg-gradient-to-tr from-indigo-300 to-pink-300 opacity-90
               blur-md dark:opacity-30 md:h-14 md:w-64"
            />
            <button
              type="button"
              className="w-50 relative mt-4 h-10 w-44 rounded-3xl bg-gradient-to-tr from-indigo-300 to-pink-300 transition-all hover:scale-105 active:scale-95 sm:h-11
              sm:w-52 md:h-14 md:w-64"
            >
              <p className="text-base uppercase text-white sm:text-lg md:text-2xl">
                Try right now
              </p>
            </button>
          </div>
        </div>
        <div className="flex w-2/6 items-center md:block md:w-1/4">
          <div className="relative">
            <div
              className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2
               bg-purple-400 opacity-40 blur-3xl"
            />
            <img className="" src={sphere} alt="img" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
