import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type FormInputs = {
  destination: string;
  title: string;
  custom: string;
};

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const onSubmit = (data: FormInputs) => {
    const newData = JSON.stringify(data);
    navigate('/link');
  };
  const { t } = useTranslation();
  return (
    <div className="flex justify-center px-8 pt-8 text-left">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[300px] md:w-[500px]"
      >
        <p className="text-2xl font-bold dark:text-white">
          {t('createPageTitle')}
        </p>
        <div className="pt-8 text-left">
          <label htmlFor="destination" className="flex flex-col text-lg">
            {t('createURL')}
            <input
              type="text"
              {...register('destination', {
                required: true,
                pattern:
                  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??#?)?)/,
              })}
              className={`mt-2 h-8 w-72 rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white md:w-full
              ${
                errors.destination &&
                'border-2 border-red-500 focus:outline-none'
              }`}
            />
          </label>
          {errors.destination?.type === 'required' && (
            <span className="text-red-500">{t('createURLErrorRequired')}</span>
          )}
          {errors.destination?.type === 'pattern' && (
            <span className="text-red-500">{t('createURLErrorPattern')}</span>
          )}
        </div>
        <div className="pt-8 text-left">
          <label htmlFor="title" className="flex flex-col text-lg">
            {t('createTitle')} ({t('createOptional')})
            <input
              type="text"
              {...register('title')}
              className="mt-2 h-8 w-72 rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white md:w-full"
            />
          </label>
        </div>
        <div className="pt-8 text-left">
          <label htmlFor="custom" className="flex flex-col text-lg">
            {t('createCustom')} ({t('createOptional')}):
            <div className="mt-2 flex flex-row items-center space-x-5">
              <div className="flex h-8 w-24 items-center justify-center rounded ring-1 ring-gray-400/[.40] dark:bg-black/[.20]">
                <p className="text-gray-700">sh0.ty</p>
              </div>
              <p className="text-2xl">/</p>
              <input
                type="text"
                {...register('custom', {
                  pattern: /^[a-zA-Z0-9]+$/,
                })}
                className={`h-8 w-36 rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white ${
                  errors.custom && 'border-2 border-red-500 focus:outline-none'
                }`}
              />
              {errors.custom?.type === 'pattern' && (
                <span className="text-red-500">
                  {t('createCustomErrorPattern')}
                </span>
              )}
            </div>
          </label>
        </div>
        <button
          type="submit"
          className="mb-10 mt-8 h-7 w-32 rounded-xl bg-blue-300 text-white shadow-xl shadow-blue-200 transition-all
          hover:scale-105 dark:shadow-blue-200/[.1]"
        >
          Создать
        </button>
      </form>
    </div>
  );
}

export default Create;
