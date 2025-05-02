import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import LoginPage from './pages/login-page/login-page';
import StartPage from './pages/start-page/start-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import './App.css';
import MainLayout from './components/layouts/MainLayout';

function App() {
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('isLogin');
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route index path="login" element={<LoginPage />} />
            <Route path="start" element={<StartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
