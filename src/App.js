import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PasswordRecovery from "./pages/PasswordRecovery";
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';

function App() {

  const body = document.body;

  window.onmousemove = function (e) {
    let x = e.clientX;
    let y = e.clientY;

    body.style.backgroundPositionX = x / 10 + "px"
    body.style.backgroundPositionY = y / 10 + "px"
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
