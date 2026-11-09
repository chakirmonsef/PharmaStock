import { BrowserRouter } from 'react-router-dom';
import Sidebar from './layout/sidebar';
import Header from './layout/header';
import './styles/app.css';
import './styles/theme.css';
import './styles/professional.css';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('pharmastock-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('pharmastock-theme', theme);
  }, [theme]);
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="main-content">
          <Header
            theme={theme}
            onToggleTheme={() =>
              setTheme((current) =>
                current === 'light' ? 'professional' : current === 'professional' ? 'dark' : 'light',
              )
            }
          />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
