import Switch from '@/components/Switch/Switch';

function Create() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center px-8 pt-8 text-left">
      <form onSubmit={handleSubmit} className="w-2/3">
        <p className="text-4xl font-bold dark:text-white">Create new link</p>
        <div className="pt-8 text-left">
          <label htmlFor="destination" className="flex flex-col text-lg">
            Destination:
            <input
              type="text"
              className="mt-2 h-10 rounded px-2 text-lg text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white"
            />
          </label>
        </div>
        <div className="pt-8 text-left">
          <label htmlFor="title" className="flex flex-col text-lg">
            Title (optional):
            <input
              type="text"
              className="mt-2 h-10 rounded px-2 text-lg text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white"
            />
          </label>
        </div>
        <div className="pt-8 text-left">
          <label htmlFor="title" className="flex flex-col text-lg">
            Custom short link (optional):
            <div className="mt-2 flex flex-row items-center space-x-5">
              <div className="flex h-10 w-32 items-center justify-center rounded ring-1 ring-gray-400/[.40] dark:bg-black/[.20]">
                <p className="text-lg text-gray-700 ">sh0.ty</p>
              </div>
              <p className="text-2xl">/</p>
              <input
                type="text"
                className="h-10 rounded px-2 text-lg text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white"
              />
            </div>
          </label>
        </div>
        <div className="mt-8 flex flex-row items-center">
          <Switch isToggled={false} onToggle={() => {}} />
          <p className="pl-4">Generate QR Code</p>
        </div>

        <button
          type="submit"
          className="mt-8 h-8 w-32 rounded-md bg-gradient-to-tr from-purple-600 to-pink-400 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
