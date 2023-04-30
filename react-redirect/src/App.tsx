import { Route, Routes } from 'react-router-dom'
import Page from '@/Page'

export default function App() {
  return (
    <Routes>
      <Route path=":linkRef" element={<Page />} />
    </Routes>
  )
}
