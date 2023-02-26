import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Links from './pages/Links';
import Error from './pages/Error';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="link" element={<Links />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
