import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { HTMLInputTypeAttribute } from 'react'

export default function InputComponent({
  type,
  name,
  label,
  registerOptions,
  register,
  maxLength,
}: {
  type?: HTMLInputTypeAttribute
  name: string
  label: string
  registerOptions: RegisterOptions
  register: UseFormRegister<any>
  maxLength?: number
}) {
  const { required, pattern, validate } = registerOptions
  return (
    <div className="relative h-10 w-full min-w-[100px]">
      <input
        id={name}
        type={type}
        maxLength={maxLength}
        {...register(name, { required, pattern, validate })}
        className="peer h-full w-full rounded-lg border border-gray-200 border-t-transparent bg-transparent px-3 py-2.5
         font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border
          placeholder-shown:border-gray-200 focus:border-2 focus:border-sky-500 focus:border-t-transparent
           focus:outline-0 disabled:border-0 disabled:bg-gray-50 dark:border-gray-600 dark:border-t-transparent
            dark:text-gray-300 dark:placeholder-shown:border-gray-600 dark:focus:border-sky-500
             dark:focus:border-t-transparent"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none truncate text-[11px] font-normal
         leading-tight text-gray-400 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px]
          before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t
           before:border-gray-200 before:transition-all before:content-[''] after:pointer-events-none after:ml-1
            after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md
             after:border-r after:border-t after:border-gray-200 after:transition-all after:content-['']
              peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500
               peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent
                peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-l-2
                 peer-focus:before:border-t-2 peer-focus:before:border-sky-500 peer-focus:after:border-r-2
                  peer-focus:after:border-t-2 peer-focus:after:border-sky-500 peer-disabled:text-transparent
                   peer-disabled:before:border-transparent peer-disabled:after:border-transparent
                    peer-disabled:peer-placeholder-shown:text-gray-500 dark:before:border-gray-600
                     dark:after:border-gray-600"
      >
        {label}
      </label>
    </div>
  )
}

InputComponent.defaultProps = {
  maxLength: 256,
  type: 'text',
}
