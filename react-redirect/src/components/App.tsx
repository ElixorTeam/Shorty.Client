import { Route, Routes } from 'react-router-dom'

import ErrorPage from '@/components/ErrorPage'
import Redirect from '@/components/Redirect'

export default function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-black dark:text-white">
      <Routes>
        <Route path=":linkRef" element={<Redirect />} />
        <Route path="" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}
