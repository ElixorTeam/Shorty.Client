import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Links from './pages/Links';
import Error from './pages/Error';
import Create from './pages/Create';
import Auth from './pages/AuthPage/Auth';
import Support from './pages/Support';
import QRCodes from './pages/QRCodes';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout isToggleSideBar={false} />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Route>
      <Route path="/" element={<Layout isToggleSideBar />}>
        <Route path="link" element={<Links />} />
        <Route path="create" element={<Create />} />
        <Route path="support" element={<Support />} />
        <Route path="qrcodes" element={<QRCodes />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}

export default App;
