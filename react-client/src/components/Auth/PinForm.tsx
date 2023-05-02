// 'use client'
//
// import { useForm } from 'react-hook-form'
// import { useRouter } from 'next/navigation'
// import { PinField } from 'react-pin-field'
//
// export default function PinForm({
//   onSubmit,
//   translate
// }: {
//   onSubmit: (data: FormData) => void
//   translate: { [key: string]: string }
// }) {
//   const { handleSubmit, control: controlPin } = useForm<FormData>()
//   const router = useRouter()
//
//   return (
//     <div className="m-auto flex h-max w-2/3 flex-col items-center justify-center rounded-lg p-32">
//       <p className="mb-10 text-4xl font-bold dark:text-white">
//         {translate.pinTitle}
//       </p>
//       <p className="px-5 pt-1 text-sm text-gray-400">
//         {translate.pinDescription}
//       </p>
//       <div className="mb-6 flex gap-x-4 py-4">
//         <PinField
//           length={5}
//           validate="0123456789"
//           inputMode="numeric"
//           autoFocus
//           className="h-10 w-8 rounded-md bg-black/[.05] text-center text-lg shadow-sm dark:bg-black/[.30] dark:text-white"
//         />
//       </div>
//       <button
//         type="submit"
//         onClick={() => router.push('/links')}
//         className="my-2 h-[34px] w-6/12 rounded-xl bg-gradient-to-tr from-indigo-300 to-pink-300 shadow-md"
//       >
//         <p className="text-white">{translate.pinSubmit}</p>
//       </button>
//     </div>
//   )
// }
