import { Route, Routes } from 'react-router-dom'
import Redirect from '@/Redirect'

export default function App() {
  return (
    <Routes>
      <Route path=":linkRef" element={<Redirect />} />
    </Routes>
  )
}
