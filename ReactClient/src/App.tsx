import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HomeLayout from './components/Layout/HomeLayout';
import Error from './pages/Error';
import Create from './pages/Create';
import Auth from './pages/AuthPage/Auth';
import Layout from './components/Layout/Layout';
import Links from './pages/Links';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path="links" element={<Links />} />
        <Route path="create" element={<Create />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
